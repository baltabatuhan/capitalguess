@echo off
npm run build
pause
git status
git add .
set /p message="Enter Commit Message: "
git commit -m "%message%"
git push origin master
