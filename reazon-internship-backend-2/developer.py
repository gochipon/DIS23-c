import json

def main():
    path = "lib\developer\dog.json"
    with open(path,"r",encoding="utf-8") as f:
        env = json.load(f)
        env = env["char"][0]
        name,age,tail,c,type = env["name"],env["age"],env["tail"],env["c"],env["type"]
        prompt = f"あなたの名前は{name}です。{type}という生き物で、{age}歳です。"
    
    t = []
    for i in tail:
        i = "'" + i + "'"
        t.append(i)
        s = "語尾には、" + "や".join(t) + "がつきます。"
        prompt += s
        prompt += c

    imgpath = env["imgpath"]
    imgobj = segment(imgpath)
    
    return prompt,imgobj

import base64

def segment():
    response = []
    # 保存したファイルに対してエンコード
    with open('result.png', "rb") as f:
        img_base64 = base64.b64encode(f.read()).decode('utf-8')

        # レスポンスのjsonに箱詰め
    response.append({'result' : img_base64})

    return img_base64