# GroupMe: On This Day

Ever use apps like Timehop or Facebook's "On This Day" to see what you were doing however many number of years ago? Have a groupchat on GroupMe that you've been using for several years and want to see what was important to you guys on this day x number of years ago? This is the app for you!

## How It Works
Get your access token from the [GroupMe API](https://dev.groupme.com/) and then select your chat.

## Things I'll fix eventually
1. Currently only supports viewing the 10 most recent groups per user
2. Runs pretty slowly for long group chats (took about a minute and a half to load a chat with ~70K messages). This is because I'm not storing anything, and every query requires calls to the API.
3. No way to go back (you shouldn't *need* to for the uses of this site, but probably good to include)
4. Design tweaks
5. Code restructuring
6. Allowing a search by date (what if you missed yesterday's convos but you don't want to wait a full 364 days to read it again?)
7. A better README (since this was created in the midst of finals season)

---
*The fun little backstory and inspiration in creating this*:
My friends from high school and I have a group chat we've been texting in nearly every day since freshman year of college, where we've had different "themes" (change our nicknames and chat name) every so often. One day, one of my friends said "wow, I wish there was a log to see all of our name changes" and after a little investigating on Google, I came across [groupme-tools](https://github.com/cdzombak/groupme-tools). I got our transcript and wrote a neat little function to just give us a log of our name changes. But me, being a nostalgic social media addict, thought it would be cool to see the things that were important to us earlier on in college. Thus, this web app was born.