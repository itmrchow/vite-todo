# claude-dev-flow-poc
是一個以todo-list為例的claude 開發流程的驗證性專案

## tools
- notion / notion mcp

## 流程
### Story 解析 , task 計畫與建立
claude 讀取 project的story ticket -> claude planing 所需要的task -> 核准 ->claude根據ticket建立所需要的task

### Task 執行
claude 讀取 task ticket -> 確認ticket的assignee是否為自己 -> task planing -> 執行 -> update sub task -> update task

## notion設置
notion是這個專案的專案管理工具 , 該專案相關的專案管理資料放在`POC`這個page下 , 以下描述和notion的相關設定
### 結構
- POC
  - Projects & Tasks
    - project (story , spec)
    - task (devlop task)
### 實作流程
- 使用notion mcp tool 讀取notion的資料 , 提供ticket type (Project or task) & (id or keyword)
- 確認ticket的assignee是否為自己
- 確認是自己根據task執行
  - task planing
  - create sub task
  - task 執行
  - update sub task
  - update task