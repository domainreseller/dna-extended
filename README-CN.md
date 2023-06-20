<div align="center">  
  <a href="README.md"   >   TR <img style="padding-top: 8px" src="https://raw.githubusercontent.com/yammadev/flag-icons/master/png/TR.png" alt="TR" height="20" /></a>  
  <a href="README-EN.md"> | EN <img style="padding-top: 8px" src="https://raw.githubusercontent.com/yammadev/flag-icons/master/png/US.png" alt="EN" height="20" /></a>  
  <a href="README-CN.md"> | CN <img style="padding-top: 8px" src="https://raw.githubusercontent.com/yammadev/flag-icons/master/png/CN.png" alt="CN" height="20" /></a>  
  <a href="README-AZ.md"> | AZ <img style="padding-top: 8px" src="https://raw.githubusercontent.com/yammadev/flag-icons/master/png/AZ.png" alt="AZ" height="20" /></a>  
  <a href="README-DE.md"> | DE <img style="padding-top: 8px" src="https://raw.githubusercontent.com/yammadev/flag-icons/master/png/DE.png" alt="DE" height="20" /></a>  
  <a href="README-FR.md"> | FR <img style="padding-top: 8px" src="https://raw.githubusercontent.com/yammadev/flag-icons/master/png/FR.png" alt="FR" height="20" /></a>  
  <a href="README-AR.md"> | SA <img style="padding-top: 8px" src="https://raw.githubusercontent.com/yammadev/flag-icons/master/png/SA.png" alt="AR" height="20" /></a>  
  <a href="README-NL.md"> | NL <img style="padding-top: 8px" src="https://raw.githubusercontent.com/yammadev/flag-icons/master/png/NL.png" alt="NL" height="20" /></a>  
</div>

Domainnameapi.com WHMCS 插件模块
==============================

此模块使用 `domainnameapi.com` API，允许您在 WHMCS 中管理所有域名。通过此模块，您可以获得以下功能：

* 查看所有域名
* 批量同步
* 批量导入
* 批量联系人更改
* 批量 NS 更改
* 批量隐私和域名锁定编辑
* 批量确认或取消传入和传出的转移

要求
----

* WHMCS 7.0 或更高版本
* PHP 7.2 或更高版本（需要启用 Soap 和 Curl 扩展）
* 已激活并配置 domainnameapi 注册商模块

安装
----

1. 将下载的文件上传到您的 WHMCS 服务器目录中（应位于 `whmcs_directory/modules/Addons/dnaextended` 目录下）。
2. 登录 WHMCS 管理面板。
3. 转到 "系统设置" > "插件模块" 或在 WHMCS 8.0 之前转到 "设置" > "插件模块"。
4. 您会看到 DNA Extended 模块，请激活它并选择哪个管理员组应具有权限在配置中进行更改。

配置
----

1. 在左侧菜单中选择 "插件" 选项，然后点击 "DNA Extended"。
2. 在下一个页面中点击 "设置"。
3. 为了使系统正常工作，需要定期同步所有域名。请根据显示的信息设置 Cron 任务（根据您的系统，Cron 的设置可能有所不同。[cPanel 设置 Cron](https://www.youtube.com/watch?v=t5mjWGegE-g) | [Plesk 设置 Cron](https://www.youtube.com/watch?v=ur1_ua9TMXs)）。
4. 点击 "Cron 手动运行" 来一次性同步所有域名。

使用
--

### 查看和过滤所有域名

- 点击 "所有域名" 按钮查看您的所有域名。
- 您可以搜索并根据其状态进行筛选。
- 选择顶部的复选框以执行操作，或点击左侧的相关按钮。
- 确认操作。

### 批量导入域名

- 点击 "导入" 按钮，进入可以导入域名的页面。
- 此功能仅适用于在 WHMCS 上尚未分配给任何用户的域名。
- 为每个域名选择相应的客户。
- 确认操作。

### 域名之间的批量同步

- 单击 "同步" 按钮，将更新相关域名在 DNA 面板和 WHMCS 中的信息。如果域名不匹配，它将仅在 DNA 上同步。
- 匹配的域名将与 WHMCS 中的 "注册商、到期日和状态" 信息同步。

### 域名之间的批量联系人更改

- 选择要更改联系人信息的域名。
- 输入联系人信息，并选择与注册人相同的选项块（如果需要）。
- 确认操作。

### 域名之间的批量 NS 更改

- 选择要更改名称服务器（NS）的域名。
- 输入新的名称服务器。
- 确认操作。

### 域名之间的批量隐私和域名锁定更改

- 选择要更改隐私和域名锁定的域名。
- 输入新值。
- 确认操作。

### 确认或取消域名的传入和传出转移

- 选择要确认或取消的域名的传入和传出转移。
- 确认操作。



