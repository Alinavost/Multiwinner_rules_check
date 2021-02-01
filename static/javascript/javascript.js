let results = []
let isTrue = false;
$(function(){
    var loading = $('#loadbar').hide();
    $(document)
    .ajaxStart(function () {
        loading.show();
    }).ajaxStop(function () {
    	loading.hide();
    });

//    $("label.btn").on('click',function () {
//        debugger;
//    	var choice = $(this).find('input:radio').val();
//    	results.push(choice);
//    	$('#loadbar').show();
//    	$('#quiz').fadeOut();
//    	     document.getElementById('main_question').innerHTML = "Consider 5 votings which consists of the following order: " + JSON.stringify(second_order);
//             $('#first_option').replaceWith('<label id="first_option" class="element-animation1 btn btn-lg btn-primary btn-block"><span class="btn-label"><i class="glyphicon glyphicon-chevron-right"></i></span> <input type="radio" name="q_answer" value="0">1</label>');
//             $('#second_option').replaceWith('<label id="second_option" class="element-animation2 btn btn-lg btn-primary btn-block"><span class="btn-label"><i class="glyphicon glyphicon-chevron-right"></i></span> <input type="radio" name="q_answer" value="1">2</label>');
//             $('#third_option').replaceWith('<label id="third_option" class="element-animation3 btn btn-lg btn-primary btn-block"><span class="btn-label"><i class="glyphicon glyphicon-chevron-right"></i></span> <input type="radio" name="q_answer" value="2">3</label>');
//             $('#forth_option').replaceWith('<label id="forth_option" class="element-animation4 btn btn-lg btn-primary btn-block"><span class="btn-label"><i class="glyphicon glyphicon-chevron-right"></i></span> <input type="radio" name="q_answer" value="3">{{second_committee[3]}}</label>');
////
//    	setTimeout(function(){
//           $( "#answer" ).html(  $(this).checking(choice) );
//            $('#quiz').show();
//            $('#loadbar').fadeOut();
//            document.getElementById('main_question').innerHTML = "Consider 5 votings which consists of the following order: " + JSON.stringify(second_order);
////            document.getElementById('first_option').innerHTML =JSON.stringify(second_committee[0]);
////            $(".first_option").append('<label id="first_option" class="element-animation1 btn btn-lg btn-primary btn-block"><span class="btn-label"><i class="glyphicon glyphicon-chevron-right"></i></span> <input type="radio" name="q_answer" value="0">1</label>');
////            document.getElementById('second_option').innerHTML =JSON.stringify(second_committee[1]);
////            document.getElementById('third_option').innerHTML =JSON.stringify(second_committee[2]);
////            document.getElementById('forth_option').innerHTML =JSON.stringify(second_committee[3]);
////            $('#forth_option').replaceWith('<label id="forth_option" class="element-animation4 btn btn-lg btn-primary btn-block"><span class="btn-label"><i class="glyphicon glyphicon-chevron-right"></i></span> <input type="radio" name="q_answer" value="3">4</label>');
//
////             $('#first_option').replaceWith('<label id="forth_option" class="element-animation4 btn btn-lg btn-primary btn-block"><span class="btn-label"><i                            class="glyphicon glyphicon-chevron-right"></i></span> <input type="radio" name="q_answer" value="3">{{first_committee[3]}}</label>');
////             $('#forth_option').replaceWith('<label id="forth_option" class="element-animation4 btn btn-lg btn-primary btn-block"><span class="btn-label"><i                            class="glyphicon glyphicon-chevron-right"></i></span> <input type="radio" name="q_answer" value="3">{{first_committee[3]}}</label>');
////             $('#forth_option').replaceWith('<label id="forth_option" class="element-animation4 btn btn-lg btn-primary btn-block"><span class="btn-label"><i                            class="glyphicon glyphicon-chevron-right"></i></span> <input type="radio" name="q_answer" value="3">{{first_committee[3]}}</label>');
////             $('#forth_option').replaceWith('<label id="forth_option" class="element-animation4 btn btn-lg btn-primary btn-block"><span class="btn-label"><i                            class="glyphicon glyphicon-chevron-right"></i></span> <input type="radio" name="q_answer" value="3">{{first_committee[3]}}</label>');
////           /* something else */
//    	}, 1500);
//    });

//$(function(){
//  var count = 0;
//  $('#append').click(function(){
//    $('#parent').append('<div id="first'+count+'">text</div>');
//    count++;
//  });
//});

    $ans = 3;

    $.fn.checking = function(ck) {
        if (ck != $ans)
            return 'INCORRECT';
        else
            return 'CORRECT';
    };


});

        var getNextQuestion = function(choice){
        if(isTrue){
            if(questions.length > 0){
            console.log(questions.length);
            question =  questions.pop();
            answers = questions.pop();
    	    results.push(choice);
    	    $('#loadbar').show();
    	    $('#quiz').fadeOut();
    	    document.getElementById('main_question').innerHTML = "Consider 5 votings which consists of the following order: " + JSON.stringify(question);
            $('#first_option').replaceWith('<label onclick="getNextQuestion(0);" id="first_option" class="element-animation1 btn btn-lg btn-primary btn-block"><span class="btn-label"><i class="glyphicon glyphicon-chevron-right"></i></span> <input type="radio" name="q_answer" value="0">'+JSON.stringify(answers[0])+'</label>');
            $('#second_option').replaceWith('<label onclick="getNextQuestion(1);" id="second_option" class="element-animation2 btn btn-lg btn-primary btn-block"><span class="btn-label"><i class="glyphicon glyphicon-chevron-right"></i></span> <input type="radio" name="q_answer" value="1">'+JSON.stringify(answers[1])+'</label>');
            $('#third_option').replaceWith('<label onclick="getNextQuestion(2);" id="third_option" class="element-animation3 btn btn-lg btn-primary btn-block"><span class="btn-label"><i class="glyphicon glyphicon-chevron-right"></i></span> <input type="radio" name="q_answer" value="2">'+JSON.stringify(answers[2])+'</label>');
            $('#forth_option').replaceWith('<label onclick="getNextQuestion(3);" id="forth_option" class="element-animation4 btn btn-lg btn-primary btn-block"><span class="btn-label"><i class="glyphicon glyphicon-chevron-right"></i></span> <input type="radio" name="q_answer" value="3">'+JSON.stringify(answers[3])+'</label>');

    	    setTimeout(function(){
                $('#quiz').show();
                $('#loadbar').fadeOut();
    	    }, 1500);
        }
        else{
            alert("No more questions :)")
         }
        }
        isTrue =!isTrue;
    }
