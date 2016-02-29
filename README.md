vk-m3u-greasemonkey
===================

VKontakte music to M3U or WGET.sh user script

![alt vk-m3u-greasemonkey](http://i.imgur.com/VspxnOu.png)

## `wget-list.sh`
```bash
09:32:09 /Volumes/H/music/muffler cat ./wget-list\(4\).sh
wget --max-redirect 0 "https://cs9-4v4.vk.me/p8/87eba74ed379b5.mp3?extra=RnlmaTnCvYGyZeR9sBgTQ1478hxJYUblPyrP1M93oEjjtsa7gFQkzjBx5AzA0i2U0xT2kmKTFNjskPD21SVyutsMv28GOXuRcHyTfB_FWSrCszAkCPm5CXV7S_jLwJjc24T9NPnJ8R1x" -O "01. Muffler - Dark Flower.mp3"
wget --max-redirect 0 "https://cs9-8v4.vk.me/p2/0a9b9d0cfcf4f3.mp3?extra=AfONHkCeLzAzE30SzJXWSZm8O7vdNIncS8REPIs8W8AdV2f0-hrg3mCHmLK_T9bbavyRXXGqzVB6t70Ovih9WqB97RAMS-7Blk7xs-xFmC5wyOAMOBsnaO1mCUlZMJst0kkXYvg8bxGz" -O "02. MUFFLER - Valentine.mp3"
wget --max-redirect 0 "https://cs9-13v4.vk.me/p22/651fb102b797a3.mp3?extra=_F_0LNmQNPuxTVLKDFer9AL4U1ZHhVh6O8SrXalEuxivMWOcoqHetpGx8otJ3BFAgSaQ5UASwDpq0jj8Pb5xul5n8yRO_try0XL5kRVtI3nMz-W1HB5ERy5gzjsGhCgsazRrR-Cw_ezl" -O "03. Muffler - 4 Years.mp3"
wget --max-redirect 0 "https://psv4.vk.me/c536119/u173699195/audios/a0896944f517.mp3?extra=27gzG2SELmALvO9WqEWFx78X_I2tLkypzcSuDM3mq6eLwXz5cQzLY6Js6JoceLqyG5ZHq2oYJALrWBBzQ51qEhY16ADzIGcwFJBrgHIxddm_E852S0cKRuwCG-XJIlMyyc1S7D7Sj1-k" -O "04. Muffler - Start Line.mp3"
wget --max-redirect 0 "https://psv4.vk.me/c6238/u12364757/audios/77435a32a2c6.mp3?extra=yHUFFrcY2TBCrgyeMWxWBQe8p2EJLSiJ__Arso1hL2ZyYzCTJxpf53m0zOXQNARqkGf6Q8XBoKBONhXjcNjpOKkZXSnvj3J_UhUUj1qt7zmYMoj8wGhchcOXeBxiochcaORhb-_0dqLs" -O "05. Muffler - Dribble (Vip).mp3"
wget --max-redirect 0 "https://psv4.vk.me/c521504/u277839/audios/8433c8cb91ce.mp3?extra=2fUYU6ZyzGEnU6DSFP6GNak2wq-SK5kuNzudFpFLSykz7p4V-dO48tS87GNn6AYv6BQLbZ6rr95xiYrLuKUpOpCbIA1msHRfRf5byIQZguB_XvTzAEnB-yqpkiVLe8sVSuNl08KIYaFv" -O "06. Muffler - Waves Breaking.mp3"
wget --max-redirect 0 "https://psv4.vk.me/c613928/u1444216/audios/3ac4be759d91.mp3?extra=JtJxkoQavR2Lqv0akha4Fty7H3xLff5e89_CiItC9Gw940xt1vR9GjncrZuVngTK8kFDFV6dCFEDsUyMmUpV6yaB9MD97dUijAq_5M_DfajKWLqAVK07WroazyzhhFFmgJqhmBFmzzAD" -O "07. Mistabishi - From Memory (Matrix Remix).mp3"
```

## `play.m3u`
```
09:32:13 /Volumes/H/music/muffler cat ~/Downloads/play\(7\).m3u
#EXTM3U

#EXTINF:324,Muffler - Dark Flower
https://cs9-4v4.vk.me/p8/87eba74ed379b5.mp3?extra=RnlmaTnCvYGyZeR9sBgTQ1478hxJYUblPyrP1M93oEjjtsa7gFQkzjBx5AzA0i2U0xT2kmKTFNjskPD21SVyutsMv28GOXuRcHyTfB_FWSrCszAkCPm5CXV7S_jLwJjc24T9NPnJ8R1x

#EXTINF:183,MUFFLER - Valentine
https://cs9-8v4.vk.me/p2/0a9b9d0cfcf4f3.mp3?extra=AfONHkCeLzAzE30SzJXWSZm8O7vdNIncS8REPIs8W8AdV2f0-hrg3mCHmLK_T9bbavyRXXGqzVB6t70Ovih9WqB97RAMS-7Blk7xs-xFmC5wyOAMOBsnaO1mCUlZMJst0kkXYvg8bxGz

#EXTINF:361,Muffler - 4 Years
https://cs9-13v4.vk.me/p22/651fb102b797a3.mp3?extra=_F_0LNmQNPuxTVLKDFer9AL4U1ZHhVh6O8SrXalEuxivMWOcoqHetpGx8otJ3BFAgSaQ5UASwDpq0jj8Pb5xul5n8yRO_try0XL5kRVtI3nMz-W1HB5ERy5gzjsGhCgsazRrR-Cw_ezl

#EXTINF:262,Muffler - Start Line
https://psv4.vk.me/c536119/u173699195/audios/a0896944f517.mp3?extra=27gzG2SELmALvO9WqEWFx78X_I2tLkypzcSuDM3mq6eLwXz5cQzLY6Js6JoceLqyG5ZHq2oYJALrWBBzQ51qEhY16ADzIGcwFJBrgHIxddm_E852S0cKRuwCG-XJIlMyyc1S7D7Sj1-k

#EXTINF:315,Muffler - Dribble (Vip)
https://psv4.vk.me/c6238/u12364757/audios/77435a32a2c6.mp3?extra=yHUFFrcY2TBCrgyeMWxWBQe8p2EJLSiJ__Arso1hL2ZyYzCTJxpf53m0zOXQNARqkGf6Q8XBoKBONhXjcNjpOKkZXSnvj3J_UhUUj1qt7zmYMoj8wGhchcOXeBxiochcaORhb-_0dqLs

#EXTINF:310,Muffler - Waves Breaking
https://psv4.vk.me/c521504/u277839/audios/8433c8cb91ce.mp3?extra=2fUYU6ZyzGEnU6DSFP6GNak2wq-SK5kuNzudFpFLSykz7p4V-dO48tS87GNn6AYv6BQLbZ6rr95xiYrLuKUpOpCbIA1msHRfRf5byIQZguB_XvTzAEnB-yqpkiVLe8sVSuNl08KIYaFv

#EXTINF:451,Mistabishi - From Memory (Matrix Remix)
https://psv4.vk.me/c613928/u1444216/audios/3ac4be759d91.mp3?extra=JtJxkoQavR2Lqv0akha4Fty7H3xLff5e89_CiItC9Gw940xt1vR9GjncrZuVngTK8kFDFV6dCFEDsUyMmUpV6yaB9MD97dUijAq_5M_DfajKWLqAVK07WroazyzhhFFmgJqhmBFmzzAD
```
