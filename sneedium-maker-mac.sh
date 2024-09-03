y=$(date +%y)
read -p "Sneedium4Mac # of year $y (1,2,3,4...):" v
npm run make-mac
mkdir "Sneedium $y.$v"
mv sneedium-darwin-* "Sneedium4Mac $y.$v"
tar -czvf "Sneedium4Mac $y.$v.tar.gz" "Sneedium4Mac $y.$v"
rm -rf "Sneedium $y.$v"
mkdir ~/sneedium-mac-bins
mv "Sneedium $y.$v.tar.gz" ~/sneedium-mac-bins
