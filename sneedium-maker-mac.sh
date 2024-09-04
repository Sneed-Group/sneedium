y=$(date +%y)
read -p "Sneedium4Mac # of year $y (1,2,3,4...):" v
npm run make-mac
mkdir "Sneedium $y.$v"
cp -r sneedium-darwin-arm64 "Sneedium4Mac $y.$v"
cp -r sneedium-darwin-x64 "Sneedium4Mac $y.$v"
rm -rf "sneedium-darwin-arm64"
rm -rf "Ssneedium-darwin-x64"
tar -czvf "Sneedium4Mac $y.$v.tar.gz" "Sneedium4Mac $y.$v"
rm -rf "Sneedium4Mac $y.$v"
mkdir ~/sneedium-mac-bins
cp "Sneedium4Mac $y.$v.tar.gz" "~/sneedium-mac-bins"
rm "Sneedium4Mac $y.$v.tar.gz"
