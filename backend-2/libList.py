import glob
import os
import subprocess
import sys

class libHandler:
    def __init__(self):
        pluginlist = glob.glob("lib\*")
        self.funcList = []

        for i in pluginlist:
            print(i)
            i = i.replace("lib\\","")
            print(i)
            self.funcList.append(i)

    def getFunc(self,pluginname:str):
        self.pluginName = pluginname
        # self.pluginList = glob.glob("lib\\")
        # print(self.pluginList)
        self.prompt, imgObj = self.doPlugin()
        # self.doPlugin()
        return self.prompt, imgObj

    def doPlugin(self):
        # for i in self.pluginList:
        #     if i[-3:] == ".py":
        #         prompt = ""
        #         #path
        #         #C:\Users\Noritaka_Niwa\Desktop\Rinternship\UI
        i = self.pluginName
        # lib/developer/main.py
        print("i=",i)
        path = os.path.join(*["C:\\Users\\xbzdc\\reazon-internship-backend-2\\lib\\", i, "main.py"])
        print(path)
        # prompt,img = subprocess.check_output(["python","/home/pkmiya/Reazon-Internship/reazon-internship-backend-2/lib/"+i,"/main()"])
        # subprocess.run(["python3 ", path])
        # subprocess.run([path])
        print("python3", path)
        # prompt,img = subprocess.Popen("python3", path)
        prompt = subprocess.Popen(["python3", path], stdout=subprocess.PIPE)
        img = prompt.communicate()[0].decode("utf-8")

        print(prompt)
        self.prompt = img
        # prompt = prompt.decode("utf-8")
        # self.prompt = prompt
        print(prompt, img)
        return prompt, img

if __name__ == "__main__":
    a = libHandler()
    a.getFunc("one")