@echo off
for /f "tokens=1 delims=/" %%i in ('cd') do SET PATH=%%i
echo .:Inicio Proceso de Registro:.
echo 1. Buscando Librerias Dinamicas
dir "%PATH%\*.dll" /s /b >> tmp.txt
for /F "eol=; delims=¨" %%i in (tmp.txt) do @echo C:\windows\system32\regsvr32.exe /s "%%i" >> registra.bat
del tmp.txt
echo 2. Registrando Librerias Dinamicas
call registra.bat
del registra.bat
echo .:Fin Proceso de Registro:.
pause