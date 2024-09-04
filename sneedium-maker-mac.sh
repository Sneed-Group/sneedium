y=$(date +%y)
read -p "Sneedium4Mac # of year $y (1,2,3,4...):" v
npm run make-mac
mkdir "Sneedium $y.$v"
mv sneedium-darwin-arm64 "Sneedium4Mac $y.$v"
mv sneedium-darwin-x64 "Sneedium4Mac $y.$v"
tar -czvf "Sneedium4Mac $y.$v.tar.gz" "Sneedium4Mac $y.$v"
rm -rf "Sneedium4Mac $y.$v"
mkdir ~/sneedium-mac-bins
mv "Sneedium $y.$v.tar.gz" ~/sneedium-mac-bins
