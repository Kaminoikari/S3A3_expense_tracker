# Expense Tracker aka 家庭記帳本 aka 老爸的私房錢
此專案提供新增、修改與刪除「支出紀錄」的功能，可以藉由登入與註冊功能來建立您專屬的記帳本

免安裝連結：https://enigmatic-castle-29058.herokuapp.com/ 

![6A082083-D2FF-4631-B3E1-5A05837A26E4](https://user-images.githubusercontent.com/55652178/162565426-056c6809-47f9-4345-a503-f462c39d8c22.jpeg)
![E885D391-3C5A-4196-B01F-101E8219405C](https://user-images.githubusercontent.com/55652178/162565430-ebe471ba-8180-4a7a-bae4-0d9995541bbf.jpeg)
![A5A05C28-2132-495C-8874-0949DF311AC4](https://user-images.githubusercontent.com/55652178/162565503-7c103ca2-c70f-47ee-876d-99230bdfb963.jpeg)



## 功能列表
- 可依類別、年份與月份搜尋
- 新增、編輯和刪除支出項目
- 可使用電子信箱註冊及登入
- 可使用 Facebook 帳號登入


## 安裝與執行 (installation and execution)
1. 確保電腦已有安裝Node.js和mongoDB，使用 git 下載本專案
```
git clone https://github.com/Kaminoikari/S3A3_expense_tracker.git
```
2. 移動至本專案資料夾
```
cd S3A3_expense_tracker
```
3. 安裝套件
```
npm install
```
4. 使用種子資料 (請務必執行)
```
npm run seed
```
5. 啟動專案
```
npm run dev
```

<<<<<<< HEAD
| (name) | email	 | password | (登入後可見資料) |
|-------|:-----:|------:|
| user1   |  user1@example.com  |   12345678 | id #1, #2, #3 號記帳
| user2   |  user2@example.com  |   12345678 |
| 左3   |  中3  |   右3 |

	password	
user1		12345678	
user2	user2@example.com	12345678	id #4, #5, #6 號記帳
=======
6. 開啟預覽連結，若是在本機操作，於瀏覽器網址列輸入
```
http://localhost:3000；
```
>>>>>>> refs/remotes/origin/master

以下為已預設好的「測試用」使用者名稱與對應的帳密：

|（name) | email | password | (登入後可見支出紀錄）|
|:-----:|:-----:|------:|:-----:|
| User1   |  user1@example.com  |   12345678 | defaultRecord |
| User2   |  user2@example.com  |   12345678 | defaultRecord |


若要測試Facebook登入功能，需到[Facebook for Developers](https://developers.facebook.com/)建立應用程式  
在本專案根目錄依據".env.template"內容格式，新增".env"檔案  
並在.env填入Facebook應用程式編號、應用程式密鑰  


## 環境建置與需求
#### 環境 (Runtime Environment)
* Node.js v16.14.0  
### Package & Dependency
* bcryptjs: "^2.4.3",
* body-parser: "^1.19.2",
* connect-flash: "^0.1.1",
* dotenv: "^8.2.0",
* express: "^4.17.3",
* express-handlebars: "^6.0.3",
* express-session: "^1.17.2",
* method-override: "^3.0.0",
* mongoose: "^6.2.10",
* passport: "^0.4.1",
* passport-facebook: "^3.0.0",
* passport-local: "^1.0.0"
