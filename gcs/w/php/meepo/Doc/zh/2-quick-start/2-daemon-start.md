# 守护进程模式启动:
如果遇到没有权限的问题, 请使用sudo或切换到root账户. 因为默认的情况下, 日志是放在/var/log/meepo_ps/目录, Pid文件是存放在/var/run/meepo_ps/目录, 这是需要root权限的.

- 启动: 命令行输入
```bash
sudo php demo-telnet.php start -d
```
- 查看状态: 命令行输入
```bash
sudo php demo-telnet.php status
```
- 平滑重启: 命令行输入
```bash
sudo php demo-telnet.php restart
```
- 平滑结束: 命令行输入
```bash
sudo php demo-telnet.php stop
```
- 强行结束: 命令行输入
```bash
sudo php demo-telnet.php kill
```
- 强行结束: 命令行输入
```bash
sudo kill -INT `cat /var/run/meepo_ps/meepo_ps_master.pid`
```