#!/bin/bash
# Test welcome page locally
echo "📖 Opening welcome.html in browser for testing..."
xdg-open /home/bekerda/ArticleR/extension/dist/welcome.html 2>/dev/null || \
open /home/bekerda/ArticleR/extension/dist/welcome.html 2>/dev/null || \
start /home/bekerda/ArticleR/extension/dist/welcome.html 2>/dev/null || \
echo "❌ Could not open browser automatically. Please open this file manually:"
echo "   file:///home/bekerda/ArticleR/extension/dist/welcome.html"
