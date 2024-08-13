y=$(date +%Y)
read -p "Sneedium # of year $y (1,2,3,4...):" v
npm run make
mkdir "Sneedium $y.$v"
mv sneedium-linux-* "Sneedium $y.$v"
mv sneedium-win32-* "Sneedium $y.$v"
tar -czvf "Sneedium $y.$v.tar.gz" "Sneedium $y.$v"
rm -rf "Sneedium $y.$v"
mkdir ~/sneedium-bins
mv "Sneedium $y.$v.tar.gz" ~/sneedium-bins