
from openai import OpenAI
import os

client = OpenAI(
    api_key=os.getenv('OPEN_AI_API_KEY')
)


def cg_conversation(input_txt):
    completion = client.chat.completions.create(
        model="gpt-4o-mini",
        store=True,
        messages=[
            {"role": "user", "content": input_txt}
        ]
    )
    return completion.choices[0].message
