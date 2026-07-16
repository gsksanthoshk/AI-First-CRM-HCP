from groq import Groq
from app.config import GROQ_API_KEY

client = Groq(api_key=GROQ_API_KEY)


def generate_summary(notes: str):
    prompt = f"""
You are an AI CRM assistant.

Generate a concise professional meeting summary.

Return plain text only.
Do NOT use Markdown.
Do NOT use **bold** formatting.

Include:
1. Doctor
2. Key discussion
3. Follow-up
4. Action items

Meeting Notes:
{notes}
"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.3,
        max_tokens=250,
    )

    return response.choices[0].message.content