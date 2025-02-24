○ 프로젝트 구조 설명

### 프로젝트 구조는 다음과 같습니다.

scripts 파일과 styles 파일을 만들어 해당하는 파일을 넣었고
서버와 페이지는 단일 구조로 생성했습니다.
explain.md는 요구사항을 모니터링 하며 작업하기 위한 파일입니다.

```
KDT-FUL-3_subject4_최정민
└─ KDT-FUL-3_subject-3-4_member_9
   ├─ 404page.html
   ├─ README.md
   ├─ app.js
   ├─ explain.md
   ├─ index.html
   ├─ package.json
   ├─ scripts
   │  ├─ async.js
   │  └─ modal.js
   └─ styles
      └─ style.css

```

async.js 에서는 fetch를 이용한 async, await을 이용해 통신을 컨트롤 하는 파일입니다.
각 이벤트를 동적으로 생성하고 관리하고 있습니다.

○ 실행 방법

폴더의 루트에 위치한 뒤 node app.js 를 입력해 실행합니다.
서버를 실행하게 되면 console에 "http://localhost:8000 에서 서버 구동 중 "라는 메세지와 함께 구동됩니다.

○ 구현 기능 목록

기본적인 CRUD를 목적으로 제작하였습니다.

글쓰기, 글 자세히 보기, 글 수정, 삭제 를 구현했습니다.
서버 콘솔에 요청 url 마다 요청된 url과 받은 요청의 status를 확인할 수 있습니다,
수정, 삭제 후 데이터를 콘솔에 띄워 현재 데이터를 확인할 수 있습니다.

○ 학습 내용 정리

CRUD를 선행했던 경험이 있지만 express를 이용해 손쉬운 CRUD를 했었던 터라
단일 node 모듈로는 처음 해봤습니다.

때문에 많은 시행착오가 있었고, 그에 따른 검색 시간도 많이 할애해야 했던 것 같습니다.

기본적으로 이벤트 구현은 되었지만 이벤트 함수의 위치, 오탈자 등에서 나는 오류가 적지 않게 있었고 더욱 꼼꼼히 오탈자를 확인, 변수명을 다시한번 확인하는 작업등을 추가하였습니다.
Content-Type의 다양성을 검색을 통해 접했고 "application/x-www-form-urlencoded" 라는 Type을 적용해봤습니다.

이 타입은 데이터의 크기가 크지 않아서 데이터를 key-value 로 가져오기에 적합하다고 생각했습니다.

URL에서 안전하게 데이터를 전송하기 위해 특수 문자(공백, &, ?, = 등)를 인코딩하는 함수를 찾을 수 있었고 encodeURIComponent()를 사용해 데이터를 전송해봤습니다.

데이터가 Body에 담기는 post 방식에서는 필요가 없다는 것을 알았지만 "application/x-www-form-urlencoded" 방식을 채택해놨기 때문에 서버에서 해석하는 방식을 데이터 보존 방식을 사용했어야 했습니다.

동기: 파일 읽기 (readFileSync): 파일을 동기적으로 읽음\
 배열 조작 (map, filter): 동기적으로 실행됨\
 res.end() 이후 코드 실행되지 않음: 응답을 보낸 후에는 더 이상 코드가 실행되지 않음

비동기: console.log로 현재 위치 확인\
 fetch()를 이용해 서버에서 응답을 기다린 후 데이터를 받아옴
