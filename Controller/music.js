import music from "../DB Models/Music.js"

export const index = async (req, res) => { 
    const all_Music = await music.find({}).lean();
    // await music.create({
    //     name: "Amr Diab",
    //     description: "Amr Abdel Basset Abdel Azeez Diab (Arabic: عمرو عبد الباسط عبد العزيز دياب, IPA:  born 11 October 1961) is an Egyptian singer, composer and actor.[1] He has established himself as a globally acclaimed recording artist and author.[2] He is a Guinness World Record holder, the best selling Middle Eastern artist, a seven-times winner of World Music Awards and five-times winner of Platinum Records.",
    //     image :"Amr.jpg",
    //     Facebook_link : "https://www.facebook.com/AmrDiab/",
    //     Instagram_link:"https://www.instagram.com/amrdiab/",
    //     twitter_link : "https://twitter.com/amrdiab",
    //     Google_link : "https://www.google.com/search?sca_esv=de7a49ba27450786&sxsrf=ACQVn0-UPSHtpOO0l8OwyCEl951NGIuzjA:1706717556639&q=Amr+Diab&si=AKbGX_paaCugDdYkuX2heTJMr0_FGRox2AzKVmiTg2eQr2d-rnYKWkt2k5alEorF8u92EUSwPlAdSXCtnk3CypZuQLwTF-UAQBv_ENh43Mbnk-x78xXDyhvNtBMCyXMwunI1tpIy2rM1_dW1hfChxNHeQR6c-t9vZl2AMKz6JMdXc6En9NDudjGLSygmQR4kSUfxZdKcaOTJ&sa=X&ved=2ahUKEwj65cetgoiEAxXKUqQEHTqmDfkQmxMoAHoECBsQAg&biw=1536&bih=703&dpr=1.25",
    //     Wikipedia_link : "https://en.wikipedia.org/wiki/Amr_Diab",
    //     song_1_Name: "Rihet Elhabayeb",
    //     song_1_Released : "2004",
    //     song_1_Album : "Leily Nahary",
    //     song_1_Album_link : "https://www.google.com/search?",
    //     song_1_Image : "amr2.jpeg",
    //     song_1 : "10.Rihet_El_Habayib.mp3",
    //     song_2_Name : "We Ghalawtak",
    //     song_2_Released :"1998",
    //     song_2_Album :"Awedony",
    //     song_2_Album_link :"https://www.google.com/search?",
    //     song_2_Image :"Awedony-album-by-amr-diab.jpg",
    //     song_2 :"07.Weghalawtac.mp3",
    // });
    // await music.create({
    //     name: "Abdel Halim Hafez",
    //     description: "Abdel Halim Ali Shabana (Arabic: عبد الحليم علي شبانة), commonly known as Abdel Halim Hafez (Arabic: عبد الحليم حافظ), (June 21, 1929 - March 30, 1977), was an Egyptian singer, actor, conductor, businessman, music teacher and film producer. He is considered to be one of the greatest Egyptian musicians along with Umm Kulthum, Mohamed Abdel Wahab, Farid Al Atrach, Mohamed Fawzi, and Shadia. As his popularity grew, he was given the nickname 'el-Andaleeb el-Asmar (Arabic: العندليب الأسمر),meaning The Dark-Skinned Nightingale.To date, he has sold over 80 million records",
    //     image :"Abd El7alem.jpg",
    //     Facebook_link : "None",
    //     Instagram_link:"None",
    //     twitter_link : "None",
    //     Google_link : "https://www.google.com/search?q=abd+el+halim+hafez&sca_esv=de7a49ba27450786&biw=1280&bih=607&sxsrf=ACQVn0-rnqJKEAXDwSL3gjpIRWaPWCrDiw%3A1707421001029&ei=SS3FZdiZAarBxc8PyduAiA8&ved=0ahUKEwiY4v3xvpyEAxWqYPEDHcktAPEQ4dUDCBA&uact=5&oq=abd+el+halim+hafez&gs_lp=Egxnd3Mtd2l6LXNlcnAiEmFiZCBlbCBoYWxpbSBoYWZlejIOEAAYgAQYigUYhgMYsAMyDhAAGIAEGIoFGIYDGLADMg4QABiABBiKBRiGAxiwAzIOEAAYgAQYigUYhgMYsANI9QZQxgVYxgVwAXgAkAEAmAEAoAEAqgEAuAEDyAEA-AEB4gMEGAEgQYgGAZAGBA&sclient=gws-wiz-serp",
    //     Wikipedia_link : "https://en.wikipedia.org/wiki/Abdel_Halim_Hafez",
    //     song_1_Name: "Ahwak",
    //     song_1_Released : "1959",
    //     song_1_Album : "in (Girls of the Day) Movie",
    //     song_1_Album_link : "None",
    //     song_1_Image : "Abd El7alem1.jpg",
    //     song_1 : "Ahwak.mp3",
    //     song_2_Name : "Ala Hezb Wedad",
    //     song_2_Released :"1963",
    //     song_2_Album :"Solo song",
    //     song_2_Album_link :"None",
    //     song_2_Image :"A.Hafez.jpg",
    //     song_2 :"09.Ala_Hesb_Wedad.mp3",
    // });
    res.render('Music/index' , {all_Music})
};