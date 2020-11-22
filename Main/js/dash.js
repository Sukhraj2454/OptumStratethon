console.log('User Live');
var req = new XMLHttpRequest();


req.open('get', '/login/user');
req.setRequestHeader('x-auth', sessionStorage.getItem('x-auth'));
req.onreadystatechange = function() {
    if(this.readyState === 4 && this.status === 200)
        {
            let  x =JSON.parse(this.responseText);
            jQuery('#PID').text(x.Id);
            jQuery('#Uid').text(x.email);
        }
}
req.send();


observations = function(){
    jQuery('#tests').html('');
    jQuery('#tests').html("<h1 id='close' style='cursor: pointer;'>X</h1>");
req.open('get', '/observations');
req.setRequestHeader('x-auth', sessionStorage.getItem('x-auth'));
req.onreadystatechange = function() {
    if(this.readyState === 4 && this.status === 200)
    {
        let data = JSON.parse(this.responseText);
        jQuery('.container').eq(0).attr('style', 'filter:blur(20px);');
        jQuery('#tests').attr('style', 'display:block');
        if(data.length == 0)
        {
            jQuery('#tests').text('No Data Found.');
        }
        for(let i=data.length-1; i>=0; i--)
        {
            var template = jQuery('#Test-template').html();
            var html = Mustache.render(template, {
                date:data[i].date,
                desc:data[i].desc,
                val:data[i].val,
                units:data[i].units
            });
            jQuery('#tests').append(html);
        }

        jQuery('#close').on('click', function () {
            jQuery('#tests').attr('style', 'display:none');
            jQuery('.container').eq(0).attr('style', 'filter:blur(0);');
        });
    }
}
req.send();
}

careplans = function()
{
    jQuery('#careplans').text('');
    jQuery('#careplans').html("<h1 id='closeCp' style='cursor: pointer;'>X</h1>");
req.open('get', '/careplans');
req.setRequestHeader('x-auth', sessionStorage.getItem('x-auth'));
req.onreadystatechange = function() {
    if(this.readyState === 4 && this.status === 200)
    {
        let data = JSON.parse(this.responseText);
        jQuery('.container').eq(0).attr('style', 'filter:blur(20px);');
        jQuery('#careplans').attr('style', 'display:block');
        if(data.length == 0)
        {
            jQuery('#careplans').text('No Data Found.');
        }
        for(let i=data.length-1; i>=0; i--)
        {
            var template = jQuery('#Care-template').html();
            var html = Mustache.render(template, {
                start:data[i].START,
                stop:data[i].STOP,
                desc:data[i].DESCRIPTION,
                reason:data[i].REASONDESCRIPTION
            });
            jQuery('#careplans').append(html);
        }

        jQuery('#closeCp').on('click', function () {
            jQuery('#careplans').attr('style', 'display:none');
            jQuery('.container').eq(0).attr('style', 'filter:blur(0);');
        });
    }
}
req.send();
}

procedures = function()
{
    jQuery('#procedures').html('');
    jQuery('#procedures').html("<h1 id='closepr' style='cursor: pointer;'>X</h1>");
req.open('get', '/procedures');
req.setRequestHeader('x-auth', sessionStorage.getItem('x-auth'));
req.onreadystatechange = function() {
    if(this.readyState === 4 && this.status === 200)
    {
        let data = JSON.parse(this.responseText);
        jQuery('.container').eq(0).attr('style', 'filter:blur(20px);');
        jQuery('#procedures').attr('style', 'display:block');
        if(data.length == 0)
        {
            jQuery('#procedures').text('No Data Found.');
        }else
        {
            jQuery('#proc h2 span').text(`${data[data.length-1].DESCRIPTION}`);
            jQuery('#proc p').text(`Cost: ${data[data.length-1].BASE_COST}`);
        }
        for(let i=data.length-1; i>=0; i--)
        {
            var template = jQuery('#Proc-template').html();
            var html = Mustache.render(template, {
                date:data[i].DATE,
                desc:data[i].DESCRIPTION,
                cost:data[i].BASE_COST,
                reason:data[i].REASONDESCRIPTION
            });
            jQuery('#procedures').append(html);
        }

        jQuery('#closepr').on('click', function () {
            jQuery('#procedures').attr('style', 'display:none');
            jQuery('.container').eq(0).attr('style', 'filter:blur(0);');
        });
    }
}
req.send();
}

jQuery('#Tests').on('click', function () {observations();});
jQuery('#cps').on('click', function () {careplans();});
jQuery('#proc').on('click', function () {procedures();});

jQuery('#lout').on('click', function () {
    req.open('delete', '/logout');
    req.onreadystatechange = function () {
        if(this.readyState === 4)
            window.location.href = '/';
    }
    req.setRequestHeader('x-auth', sessionStorage.getItem('x-auth'));
    req.send();
});