##문자열도 행렬처럼 인덱스 콜을 할 수 있다
    var word = "abcde";
    console.log(word[0]); // a
##문자열도 행렬처럼 slice를 이용해 특정 구간의 문자열만 리턴해줄 수 있다.
    word.slice(3,word.length); //"de"
그리고 word.slice(3) 이렇게 인자하나만 쓰면 같은 뜻으로 해당 인덱스부터 끝까지를 자른 문자열을 리턴한다.
##문자열을 행렬로 만들려면 split([구분자])을 써준다.
    word.split(); // return ["abcde"], 구분자가 없으므로
    word.split(""); // return ["a","b","c","d","e"], 문자열 하나씩 잘라준다.