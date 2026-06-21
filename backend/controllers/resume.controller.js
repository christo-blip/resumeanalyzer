const fs = require('fs');

 const pdf = require('pdf-parse');

// const data = await pdf(buffer);

const mammoth = require('mammoth');
const {
  analyzeResume,
  improveResumeSection
} = require('../services/openai.service');

async function extractText(file) {

  const extension =
    file.originalname
      .split('.')
      .pop()
      .toLowerCase();

  if (extension === 'pdf') {

    const buffer =
      fs.readFileSync(file.path);

    const data =
      await pdf(buffer);

    return data.text;
  }

  if (extension === 'docx') {

    const result =
      await mammoth.extractRawText({
        path: file.path
      });

    return result.value;
  }

  if (extension === 'txt') {

    return fs.readFileSync(
      file.path,
      'utf8'
    );
  }

  throw new Error(
    'Unsupported file type'
  );
}

exports.uploadResume = async (req, res) => {
  try {
    const file = req.file;

    const jobDescription =
      req.body.jobDescription || '';

    const resumeText =
      await extractText(file);

    const analysis =
      await analyzeResume(
        resumeText,
        jobDescription
      );

      const cleaned = analysis
  .replace(/```json/gi, '')
  .replace(/```/g, '')
  .trim();

const start = cleaned.indexOf('{');
const end = cleaned.lastIndexOf('}');

if (start === -1 || end === -1) {
  throw new Error('No JSON found in AI response');
}

const jsonString = cleaned.substring(start, end + 1);

console.log('JSON STRING:');
console.log(jsonString);

const parsed = JSON.parse(jsonString);
// parsed.atsScore = Math.round(parsed.atsScore * 100);
// parsed.jobMatchScore = Math.round(parsed.jobMatchScore * 100);
res.json(parsed);
console.log("SENDING RESPONSE");
res.json({
    success: true,
  data: parsed
});

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Resume analysis failed',
      error: error.message
    });
  }
};

exports.analyzeText = async (req,res) => {

  try {

    const {
      resumeText,
      jobDescription
    } = req.body;

    const analysis =
      await analyzeResume(
        resumeText,
        jobDescription
      );

    res.json(
      JSON.parse(analysis)
    );

  } catch(error) {

    res.status(500).json({
      message:'Analysis failed'
    });
  }
};

exports.improveSection = async (req,res) => {

  try {

    const {
      section,
      content
    } = req.body;

    const improved =
      await improveResumeSection(
        section,
        content
      );

    res.json({
            success: true,
      data: {
        improved,
        tips: []
      }
    });

  } catch(error) {

    res.status(500).json({
            success: false,
      error: error.message
    });
  }
};