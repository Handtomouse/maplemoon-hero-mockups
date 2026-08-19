#!/bin/sh
set -eu

packet_dir=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
cd "$packet_dir"

required_files="
readme.md
commission_brief.md
shot_list_and_call_sheet.md
acceptance_and_delivery_spec.md
message_draft_enlighten.md
message_draft_nigel.md
source_register.md
"

for file in $required_files; do
  test -s "$file"
  bytes=$(wc -c < "$file" | tr -d ' ')
  printf 'NONEMPTY %s %s bytes\n' "$file" "$bytes"
done

if rg -n '[—–]' $required_files; then
  printf 'FAIL prohibited dash found\n' >&2
  exit 1
else
  printf 'CLEAN prohibited dash count 0\n'
fi

if rg -ni '\\bvibe\\b' $required_files; then
  printf 'FAIL prohibited word found\n' >&2
  exit 1
else
  printf 'CLEAN prohibited word count 0\n'
fi

for needle in cmp_carob cmp_cacao gallery_grove gallery_pod gallery_roast 0.545 1.213 1.790 1.430 enlightenmedia.contact@gmail.com nigel@australiancarobs.com
do
  LC_ALL=C grep -RFiq -- "$needle" .
  printf 'FOUND %s\n' "$needle"
done

LC_ALL=C grep -RFiq -- 'No booking has been made' .
printf 'FOUND No booking has been made\n'

file_count=$(find . -maxdepth 1 -type f ! -name files_sha256.txt | wc -l | tr -d ' ')
byte_count=$(find . -maxdepth 1 -type f ! -name files_sha256.txt -exec stat -f '%z' {} \; | awk '{s+=$1} END{print s+0}')
printf 'FILES %s\n' "$file_count"
printf 'BYTES %s\n' "$byte_count"
