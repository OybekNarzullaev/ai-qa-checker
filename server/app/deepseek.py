from openai import OpenAI
import os
# for backward compatibility, you can still use `https://api.deepseek.com/v1` as `base_url`.
client = OpenAI(
    api_key=os.getenv('DEEP_SEEK_API_KEY'),
    base_url="https://api.deepseek.com"
)


def ds_conversation(input_txt):
    print(client.models.list)
    response = client.chat.completions.create(
        model="deepseek/deepseek-r1:free",
        messages=[
            {"role": "system", "content": "You are a helpful assistant"},
            {"role": "user", "content": input_txt},
        ],
        max_tokens=1024,
        temperature=0.7,
        stream=False
    )
    return response.choices[0].message
