$(function(){
    let results = []
    var loading = $('#loadbar').hide();
    $(document)
    .ajaxStart(function () {
        loading.show();
    }).ajaxStop(function () {
    	loading.hide();
    });

    $("label.btn").on('click',function () {
        debugger;
    	var choice = $(this).find('input:radio').val();
    	results.push(choice);
    	$('#loadbar').show();
    	$('#quiz').fadeOut();
    	setTimeout(function(){
           $( "#answer" ).html(  $(this).checking(choice) );
            $('#quiz').show();
            $('#loadbar').fadeOut();
            document.getElementById('main_question').innerHTML = "Consider 5 votings which consists of the following order: " + JSON.stringify(second_order);
            document.getElementById('first_option').innerHTML =JSON.stringify(second_committee[0]);
            document.getElementById('second_option').innerHTML =JSON.stringify(second_committee[1]);
            document.getElementById('third_option').innerHTML =JSON.stringify(second_committee[2]);
            document.getElementById('forth_option').innerHTML =JSON.stringify(second_committee[3]);
           /* something else */
    	}, 1500);
    });

    $ans = 3;

    $.fn.checking = function(ck) {
        if (ck != $ans)
            return 'INCORRECT';
        else
            return 'CORRECT';
    };
});
