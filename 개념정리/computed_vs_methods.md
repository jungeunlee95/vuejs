참고자료

[computed vs methods](https://medium.com/@hozacho/맨땅에-vuejs-계산된-속성-vuejs-instance-computed-93cb6ad7dca9)

[computed vs methods 공식문서](https://kr.vuejs.org/v2/guide/computed.html?source=post_page-----93cb6ad7dca9----------------------#mobile-bar)

---

[TOC]

---

## computed

```html
<div class="app" class="container">
    {{ clickCount*3 }} <br>
    {{ isLargerThanTen }}   <br>
    <button v-on:click="clickCount ++" class="btn btn-primary">클릭</button> <!--count ++ JS 코드를 직접 넣기-->
</div>

<script>
    new Vue({
        el: ".app",
        data: {
            clickCount:0
        },
        computed : {
            isLargerThanTen : function(){
                return this.clickCount * 3 > 10 ? "10보다 큽니다." : "10보다 작거나 같습니다"
            }
        }
    })
</script>
```

## methods

```html
<div class="app" class="container">
    {{ clickCount*3 }} <br>
    {{ isLargerThanTen() }}   <br>
    <button v-on:click="clickCount ++" class="btn btn-primary">클릭</button> <!--count ++ JS 코드를 직접 넣기-->
</div>

<script>
    new Vue({
        el: ".app",
        data: {
            clickCount:0
        },
        methods : {
            isLargerThanTen : function(){
                return this.clickCount * 3 > 10 ? "10보다 큽니다." : "10보다 작거나 같습니다"
            }
        }
    })
</script>
```



위의 두 코드는 같은 결과를 나타낸다.

그렇담!!!!! computed와 methods의 차이는!?!

<br>

---

## VueJS의 computed VS methods

#### 차이점

`computed` 는 자신이 참고하고 있는 값이 변경될 때만 재실행되고, 

`methods`는 자신이 참고하고 있는 값이 변경될 때는 물론이고, 자신의 계산식과는 전혀 상관없는 값이 변경될 때도 다시 실행이 된다.

우리는 application을 만들 때 오늘 만든 예제처럼 단순한 계산만 하지 않습니다. `methods`와 `computed` 내에는 수많은 함수들이 서로의 값을 참고하고 계산하는 복잡한 application을 만들게 됩니다. 

이때 어떤 값이 변경이 될 때 그 값과 아무 상관이 없는 함수 모두가 재실행이 된다면 어떻게 될까요? 

이 application은 비효율적이고 비생산적인 계산을 하느라 굉장히 느린 퍼포먼스를 보여줄 것입니다.

이를 피하기 위해 VueJS는 모든 상황에서 재실행되는 methods와는 달리 참고하고 있는 값의 변경에만 재실행을 하는 특별한 속성이 필요했을 것입니다. 

이 속성에 함수와 상관이 없는 값의 변경에는 굳이 재실행 될 필요가 없는 값들을 모아놓는다면, 해당 application은 훨씬 자원을 효율적이고 생산적으로 사용할 수 있게 될 것이기 때문입니다. 

이를 위해 VueJS는 자신과 관련이 없다면 재실행되지 않는 미리 계산된 속성, `computed`를 제공하고 있는 것입니다.

<br>

#### 왜 `computed` 는 자신이 참고하고 있는 값이 변경될 때만 재실행??

그 이유는!!!!!! **computed 속성은 종속 대상을 따라 저장(캐싱)된다는 것** 입니다. 

computed 속성은 해당 속성이 종속된 대상이 변경될 때만 함수를 실행합니다. 즉 변경되지 않는 한, computed 속성을 여러 번 요청해도 계산을 다시 하지 않고 계산되어 있던 결과를 즉시 반환합니다.

또한, 아무 곳에도 의존하지 않는 computed 속성의 경우 절대로 업데이트되지 않는다는 뜻입니다.

