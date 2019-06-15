let titles = [
  "바다와 노인",
  "많은 모래",
  "아무것도 안들어있음",
  "바다와 모래"
]

let descs = [
  "바다 어쩌구 저쩌구 어쩌구 저쩌구 모래 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 바다 어쩌구 저쩌구 어쩌구 저쩌구 모래",
  "바다 모래",
  "바다 노인 모래"
]

titles.map(title=>{
  descs.map(desc=>{
    console.log(JSON.stringify({title,desc}))
  })
})