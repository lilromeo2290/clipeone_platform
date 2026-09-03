#!/bin/bash
# Auto-push watcher: polls for git changes and pushes them to origin.
# Logs to /home/z/my-project/scripts/auto-push.log

cd /home/z/my-project || exit 1

LOG=/home/z/my-project/scripts/auto-push.log
INTERVAL=10  # seconds between checks

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Auto-push watcher started (interval=${INTERVAL}s)" >> "$LOG"

while true; do
  # Only consider tracked-or-addable files inside the working tree.
  if [ -n "$(git status --porcelain 2>/dev/null)" ]; then
    # Stage everything (excluding node_modules, .next, etc. via .gitignore)
    git add -A

    # Build commit message with timestamp + short file list
    TS=$(date '+%Y-%m-%d %H:%M:%S')
    SUMMARY=$(git status --porcelain | head -5 | tr '\n' '|' | cut -c1-200)
    MSG="auto: ${TS} — ${SUMMARY}"

    if git diff --cached --quiet; then
      # Nothing actually staged after add (e.g. only ignored files)
      :
    else
      echo "[$TS] Committing: ${SUMMARY}" >> "$LOG"
      git commit -m "$MSG" --no-verify >> "$LOG" 2>&1

      PUSH_OUT=$(git push origin main 2>&1)
      if [ $? -eq 0 ]; then
        echo "[$(date '+%Y-%m-%d %H:%M:%S')] Push OK" >> "$LOG"
      else
        echo "[$(date '+%Y-%m-%d %H:%M:%S')] PUSH FAILED: $PUSH_OUT" >> "$LOG"
      fi
    fi
  fi

  sleep "$INTERVAL"
done
