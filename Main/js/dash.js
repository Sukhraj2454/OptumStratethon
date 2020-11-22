console.log('User Live');
var req = new XMLHttpRequest();

procedures = function()
{
req.open('get', '/procedures');
req.setRequestHeader('x-auth', sessionStorage.getItem('x-auth'));
req.onreadystatechange = function() {
    if(this.readyState === 4 && this.status === 200)
    {
        let data = JSON.parse(this.responseText);

        if(data.length == 0)
        {
            jQuery('#procedures').text('No Data Found.');
        }else
        {
            console.log('calling');
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

req.open('get', '/login/user');
req.setRequestHeader('x-auth', sessionStorage.getItem('x-auth'));
req.onreadystatechange = function() {
    if(this.readyState === 4 && this.status === 200)
        {
            let  x =JSON.parse(this.responseText);
            jQuery('#PID').text(x.Id);
            jQuery('#Uid').text(x.email);
            procedures();
            careplans();
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
req.open('get', '/careplans');
req.setRequestHeader('x-auth', sessionStorage.getItem('x-auth'));
req.onreadystatechange = function() {
    if(this.readyState === 4 && this.status === 200)
    {
        let data = JSON.parse(this.responseText);
        if(data.length == 0)
        {
            jQuery('#careplans').text('No Data Found.');
        }
        else
        {
            jQuery('#cps h2 span').text(data[data.length-1].DESCRIPTION);
            jQuery('#cps p').text(`Reason: ${data[data.length-1].REASONDESCRIPTION}`)
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
medications = function()
{
    
    jQuery('#medications').html('');
    jQuery('#medications').html("<h1 id='closemd' style='cursor: pointer;'>X</h1>");
req.open('get', '/medications');
req.setRequestHeader('x-auth', sessionStorage.getItem('x-auth'));
req.onreadystatechange = function() {
    if(this.readyState === 4 && this.status === 200)
    {
        let data = JSON.parse(this.responseText);
        jQuery('#medications').attr('style', 'display:block');
        jQuery('.container').eq(0).attr('style', 'filter:blur(20px)');
        if(data.length == 0)
        {
            jQuery('#medications').text('No Data Found.');
        }
        for(let i=data.length-1; i>=0; i--)
        {
            var template = jQuery('#Med-template').html();
            var html = Mustache.render(template, {
                start:data[i].START,
                stop:data[i].STOP,
                pres:data[i].DESCRIPTION,
                coverage:data[i].PAYER_COVERAGE,
                cost:data[i].BASE_COST,
                disease:data[i].REASONDESCRIPTION
            });
            jQuery('#medications').append(html);
        }

        jQuery('#closemd').on('click', function () {
            jQuery('#medications').attr('style', 'display:none');
            jQuery('.container').eq(0).attr('style', 'filter:blur(0);');
        });
    }
}
req.send();
}


Devices = function()
{
    jQuery('#devices').html('');
    jQuery('#devices').html("<h1 id='closedev' style='cursor: pointer;'>X</h1>");
req.open('get', '/devices');
req.setRequestHeader('x-auth', sessionStorage.getItem('x-auth'));
req.onreadystatechange = function() {
    if(this.readyState === 4 && this.status === 200)
    {
        let data = JSON.parse(this.responseText);
        jQuery('#devices').attr('style', 'display:block');
        jQuery('.container').eq(0).attr('style', 'filter:blur(20px)');
        if(data.length == 0)
        {
            jQuery('#devices').append('No Data Found.');
        }
        for(let i=data.length-1; i>=0; i--)
        {
            var template = jQuery('#Dev-template').html();
            var html = Mustache.render(template, {
                start:data[i].START,
                stop:data[i].STOP,
                pres:data[i].DESCRIPTION,
                coverage:data[i].PAYER_COVERAGE,
                cost:data[i].BASE_COST,
                disease:data[i].REASONDESCRIPTION
            });
            jQuery('#devices').append(html);
        }

        jQuery('#closedev').on('click', function () {
            jQuery('#devices').attr('style', 'display:none');
            jQuery('.container').eq(0).attr('style', 'filter:blur(0);');
        });
    }
}
req.send();
}

Encounters = function()
{
    jQuery('#encounters').html('');
    jQuery('#encounters').html("<h1 id='closeenc' style='cursor: pointer;'>X</h1>");
req.open('get', '/encounters');
req.setRequestHeader('x-auth', sessionStorage.getItem('x-auth'));
req.onreadystatechange = function() {
    if(this.readyState === 4 && this.status === 200)
    {
        let data = JSON.parse(this.responseText);
        jQuery('#encounters').attr('style', 'display:block');
        jQuery('.container').eq(0).attr('style', 'filter:blur(20px)');
        if(data.length == 0)
        {
            jQuery('#encounters').append('No Data Found.');
        }
        for(let i=data.length-1; i>=0; i--)
        {
            var template = jQuery('#Enc-template').html();
            var html = Mustache.render(template, {
                org:data[i].Org,
                cost:data[i].Cost,
                coverage:data[i].Coverage,
                Disease:data[i].reason,
                doc:data[i].Doc
            });
            jQuery('#encounters').append(html);
        }

        jQuery('#closeenc').on('click', function () {
            jQuery('#encounters').attr('style', 'display:none');
            jQuery('.container').eq(0).attr('style', 'filter:blur(0);');
        });
    }
}
req.send();
}

Allergies = function()
{
    jQuery('#allergies').html('');
    jQuery('#allergies').html("<h1 id='closealg' style='cursor: pointer;'>X</h1>");
req.open('get', '/allergies');
req.setRequestHeader('x-auth', sessionStorage.getItem('x-auth'));
req.onreadystatechange = function() {
    if(this.readyState === 4 && this.status === 200)
    {
        let data = JSON.parse(this.responseText);
        jQuery('#allergies').attr('style', 'display:block');
        jQuery('.container').eq(0).attr('style', 'filter:blur(20px)');
        if(data.length == 0)
        {
            jQuery('#allergies').append('No Data Found.');
        }
        for(let i=data.length-1; i>=0; i--)
        {
            var template = jQuery('#arg-template').html();
            var html = Mustache.render(template, {
                org:data[i].Org,
                cost:data[i].Cost,
                coverage:data[i].Coverage,
                Disease:data[i].reason,
                doc:data[i].Doc
            });
            jQuery('#allergies').append(html);
        }
        jQuery('#closealg').on('click', function () {
            jQuery('#allergies').attr('style', 'display:none');
            jQuery('.container').eq(0).attr('style', 'filter:blur(0);');
        });
    }
}
req.send();
}


jQuery('#Tests').on('click', function () {observations();});
jQuery('#mdcs').on('click', function () {medications();});
jQuery('#devs').on('click', function () {Devices();});
jQuery('#encs').on('click', function () {Encounters();});
jQuery('#algs').on('click', function () {Allergies();});
jQuery('#cps').on('click', function () {
    
    jQuery('#careplans').text('');
    jQuery('#careplans').html("<h1 id='closeCp' style='cursor: pointer;'>X</h1>");
    careplans();
    
    jQuery('.container').eq(0).attr('style', 'filter:blur(20px);');
    jQuery('#careplans').attr('style', 'display:block');

});

jQuery('#proc').on('click', function () {
    jQuery('#procedures').html('');
    jQuery('#procedures').html("<h1 id='closepr' style='cursor: pointer;'>X</h1>");
    procedures();
    jQuery('.container').eq(0).attr('style', 'filter:blur(20px);');
    jQuery('#procedures').attr('style', 'display:block');
});

jQuery('#lout').on('click', function () {
    req.open('delete', '/logout');
    req.onreadystatechange = function () {
        if(this.readyState === 4)
            window.location.href = '/';
    }
    req.setRequestHeader('x-auth', sessionStorage.getItem('x-auth'));
    req.send();
});