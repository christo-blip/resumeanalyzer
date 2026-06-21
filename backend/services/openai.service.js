require('dotenv').config();

console.log(process.env.OPENAI_API_KEY);

const OpenAI = require('openai');

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: 'https://api.groq.com/openai/v1'
});

async function analyzeResume(
  resumeText,
  jobDescription
) {

  const prompt = `
You are an ATS resume analyzer.

Resume:
${resumeText}

Job Description:
${jobDescription}

Return ONLY JSON:

{
 "atsScore": number,
 "jobMatchScore": number,
 "summary": "",
 "strengths": [],
 "improvements": [],
 "keywords": [],
 "missingKeywords": []
}
`;

  const response =
    await client.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.3
    });

  return response.choices[0].message.content;
}

// async function improveResumeSection(
//   section,
//   content
// ) {

// const prompt = `
// You are an ATS resume analyzer.

// Return ONLY a JSON object.

// Do not use markdown.
// Do not use \`\`\`json.
// Do not provide explanations.
// Do not provide text before or after the JSON.

// Schema:
// {
//   "atsScore": number,
//   "jobMatchScore": number,
//   "summary": "",
//   "strengths": [],
//   "improvements": [],
//   "keywords": [],
//   "missingKeywords": []
// }

// Resume:
// ${resumeText}

// Job Description:
// ${jobDescription}
// `;

//   const response =
//     await client.chat.completions.create({
//       model: 'llama-3.3-70b-versatile',
//       messages: [
//         {
//           role: 'user',
//           content: prompt
//         }
//       ],
//       temperature: 0.3
//     });

//   return response.choices[0].message.content;
// }

async function improveResumeSection(section, content) {

  const prompt = `
Improve the following ${section} section of a resume.

Content:
${content}

Return only the improved version.
`;

  const response =
    await client.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    });

  return response.choices[0].message.content;
}

module.exports = {
  analyzeResume,
  improveResumeSection
};