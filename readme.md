# Lern-Periode 7

24.10. bis 19.12.2025

## Grob-Planung

1. Für welche API möchten Sie ein eigenes *front end* erstellen?
   https://lyricsovh.docs.apiary.io/#
3. Welche groben Funktionalitäten soll Ihr *front end* zur Verfügung stellen?
   Enter a song or artist name → display lyrics.
   Save ur favorite Songlyrics an Artist to ur favorites.
   Copy, share and save the lyrics.
   
   Optionally, display album art via another API.

5. Was möchten Sie insbesondere dabei lernen oder üben?
   I want to learn to use javaskript and doing this Lernperiode mostly in english.

## 24.10.

- [x] Arbeitspaket 1: Erstellen Sie mehrere Skizzen von Ihrem *front end*. Überlegen Sie sich auch, welche Elemente die Interaktion mit dem *back end* auslösen und wie sich die Oberfläche dadurch verändert. Bauen Sie auch Interaktionen ein, die *keinen* Aufruf der API benötigen, sondern sich im *client* bearbeiten lassen (sortieren, suchen etc.)
- [x] Arbeitspaket 2: Setzen Sie in HTML und CSS Ihren Entwurf auf rudimentäre Weise um.
- [x] Arbeitspaket 3: Schreiben Sie ersten JS-Code als *proof of concept* (bspw. Meldung bei Klick auf Knopf-Element)

✍️ Today I... (50-100 Wörter)
  Went through the diffent open API's and chose to make a Website that gives you the lyrics to the Song you searched. To do this Website I am going to use this API https://lyricsovh.docs.apiary.io/#. After that I startet to make a sketch for the rough design. I used AI tomake the HTML and the CSS code so I can start to focus on learning Js fast. I changed the AI Code to my preferences and later on made the Javascript file. In the skript I wrote an alert as proof of concept.
Sketch:
![WhatsApp Bild 2025-10-24 um 10 07 23_d7308b4b](https://github.com/user-attachments/assets/01020c62-4f5a-455e-a1ca-b7d5ffa5e2c4)


☝️ Vergessen Sie nicht, einen ersten Code und Skizzen auf github hochzuladen

## 31.10.

- [x] Start learning about using javaskript for this Project
- [x] Write the first paragraphs of js. Put the first animation in.
- [x] Find out how to connect th API with the Code(https://lyricsovh.docs.apiary.io/#)
- [x] Connect the API with Code and start getting the right Information to the Website.

✍️ Today I did... (50-100 Wörter)
   Wrote the first paragraphs of java skript. I made a small animation with the header. If you reload the page the header slides dynamicly in from the top. And then I connected the API with my Code. So now I can type in the Artist and the song title and then get the Lyrics. I also changed the Background color a bit but not much. And if you tipe in only the song or only the artist it gives you a warning that you have to put both in. And if the lyric can't be found it also gives you an error message.
☝️ Vergessen Sie nicht, Ihren Code auf github hochzuladen
 

## 7.11.

- [x] Copy lyrics button has to copy the lyrics
- [x] Programm the Field favorite Songs, so that it works.
- [ ] Find out how to Display the trending songs.
- [ ] Programm the Field Trendig songs, so that it works.

✍️ Today I did... (50-100 Wörter)
Wrote more JavaScript for my Lyrics Finder project. I made the “Copy Lyrics” button work, so now it copies the text to the clipboard. Then I programmed the favorites section, where I can add songs I like. The songs are saved in localStorage, so they don’t get lost after refreshing. But when I reload the page, they are not displayed on the website yet, even though they are still saved in the list. I also tested the API connection again, and it still works fine.


## 14.11

- [x] Fix the favorites display so that the saved songs show up automatically on the website after refreshing the page.
- [x] Make favorite songs clickable so that they load their lyrics automatically.
- [ ] Find out how to Display the trending songs.
- [ ] Programm the Field Trendig songs, so that it works.

 ✍️ Today I did... (50-100 Wörter)
 I fixed the favorites display. Now all the saved favorites are listed under Fav lyrics. They stay even when you refresh the page. Now you can also click on them and then the lyric of the clicked song appears. I also startet researching how to do the trending Song display. I think it a bit too compicated because I have to use two different APIs. And also I haven't found a good API for trending songs. So i probably will focus on other functions in the next week and keep the trending songs for last.

## 21.11

- [x] Add delete Button, and also limit the numbers of favorites
- [x] Improve readability of the lyrics
- [ ] Make the sharing button work(share on social media, whatsapp or export lyrics as text file.
- [ ] Remember last searches and allow quick reloading of lyrics.

✍️ Today I did... (50-100 Wörter)
Today I added a delete Button to each favorite so yo can remove saved songs indivvvidually. I also set a limit of five favortes, wich prevents the list from getting too long. Alos i improved the readability of the lyrics by adjusting the styling, making the test more clearer.
