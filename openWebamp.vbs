' CallPowerShell.vbs
' Call PowerShell from VBScript
' Author: ITomation (http://itomation.ca)
' Version 1.0 - 2015-11-27
' --------------------------------------------'

Option Explicit
Dim strPSCommand
Dim strDOSCommand
Dim objShell
Dim objExec
Dim strPSResults

' Construct PowerShell Command (PS syntax)
' strPSCommand = "(get-aduser -filter * | where {$_.enabled -eq 'True'}).count"

' Consruct DOS command to pass PowerShell command (DOS syntax)
' strDOSCommand = "powershell -command " & strPSCommand & " cd C:\ ; .\nwjs\nw.exe C:\webamp\ ; Start-Sleep -s 5"

' Create shell object
Set objShell = CreateObject("Wscript.Shell")
objShell.Run("powershell.exe -Command cd C:\webamp\; .\nwjs\nw.exe --enable-transparent-visuals --disable-gpu app")

' Execute the combined command
' Set objExec = objShell.Exec(strDOSCommand)

' Read output into VBS variable
' strPSResults = objExec.StdOut.ReadAll

' Echo results
' WScript.Echo(strPSResults)