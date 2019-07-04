## css. img 반응형 height 조절, 밑에 공백 없애기
```css
img {
  width: 100%;
  height: auto;
  display: block;
}
```

## chart.js에서 그래프가 자꾸 width:100%를 무시할 때
css를 먼저 선언할 것

## css. overflow 속성
1. 제한된 width
2. text-overflow:clip(자름) or overflow(...처리)
3. overflow:hidden(튀어나온거 안보이게)

## css. 인라인요소 줄바꿈
컨테이너에
white-space: normal;
word-break:break-word;

## css. position absolute로 완벽 가운데 정렬
```css
.align-center{
  position : absolute;
  top : 50%;
  left : 50%;
  transform : translate(-50%,-50%);
}

```