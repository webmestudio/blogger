// deklrasi prototype
$.ws = {};

// initialize
$.ws.init = {
    activate : function() {
        // active waves plugin
        Waves.init();

        // active style
        $.ws.init.style();
    },
    style : function() {
		
		/* tooltip bootstrap */
        if(typeof $.fn.tooltip != 'undefined') { 
            $('[data-toggle="tooltip"]').tooltip();
        }
        
        /* fastclick */
        var attachFastClick = Origami.fastclick;
            attachFastClick(document.body);
			
		/* plugin fancybox */
		if(typeof $.fn.fancybox != 'undefined') {
			var $links = $('.entry-content .separator a');
			$links.on('click', function(){
				$.fancybox.open( $links, {
					// Custom options
					thumbs : {
						autoStart : false
					},
					buttons : [
						'zoom',
						'fullScreen',
						'thumbs',
						'share',
						'close'
					],
					loop: true
				}, $links.index( this ) );

				return false;
			});
		}
		/* #END plugin fancybox */
			
		/* Auto Height Dropdown */
		$(window).resize(function(){
			if($('.navmenu').width() > $('.navmenu-wrap').width() ) {
				$('.navmenu-wrap').css({'overflow-y': 'hidden', 'max-width' : 'calc(100% - 287.33px)'});
				$('.navmenu li.dropdown').hover(function(){
					$('.navmenu-wrap').css('height', 'calc(100% + 36.7em)');
				}, function() {
					$('.navmenu-wrap').css('height', '60px');
				});
			}
		});
		if($('.navmenu').width() < $('.navmenu-wrap').width() ) {
			$('.navmenu-wrap').css({'overflow-y': 'hidden', 'max-width' : 'calc(100% - 287.33px)'});
			$('.navmenu li.dropdown').hover(function(){
				$('.navmenu-wrap').css('height', 'calc(100% + 36.7em)');
			}, function() {
				$('.navmenu-wrap').css('height', '60px');
			});
		}

        /* Search Toggle Show */
        $('#js-toggle-search').on('click', function() {
            /* Deklarasi Animate Target element */
            var _this   = $(this);
                box     = $('#search'),
                header  = $(".header-area"),
                overlay = $('#js-overlay'),
                speed   = 300;
            // excute
            setTimeout(function() {
                _this.css('opacity', '0');
                box.show(speed).css('right', 0);
                box.find('input').focus();
                header.addClass('active');
                overlay.addClass('visible').fadeIn(speed);
            }, speed);
            return false;
        });

        /* Search Toggle Hide */
        $('#search-close').on('click', function() {
            /* Deklarasi Animate Target element */
            var target  = $('#js-toggle-search'), 
                box     = $('#search'),
                header  = $(".header-area"),
                overlay = $('#js-overlay'),
                speed   = 300;
            // excute
            setTimeout(function() {
                box.hide(speed);
                target.css('opacity', '1');
                header.removeClass('active');
                if(!$('body').hasClass('pageslide')) {
                    overlay.fadeOut(speed).removeClass('visible');
                }
            }, speed);
            return false;
        });

        /* Popup Windows For Button Share */
        $('a.popup-window').on('click',function() {
            var w = 800, 
                h = 485,
                u = $(this).attr('data-href'),
                left = Number((screen.width/2) - (w/2)),
                tops = Number((screen.height/2) - (h/2)),
                popupWindow = window.open(u,'','toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=1, copyhistory=no, width='+w+', height='+h+', top='+tops+', left='+left);
                popupWindow.focus();
            return false;
        });
        /* #END Popup Windows For Button Share */

        /* Button Backtop */
        var o = 450, t = 650;
        $(window).scroll(function() {
            $(this).scrollTop() > o ? 
            $("#js-toggle-backtop").css('transform', 'translateX(0px)') : 
            $("#js-toggle-backtop").css('transform', 'translateX(75px)')
        }), 
        $("#js-toggle-backtop").click(function(o) {
            return o.preventDefault(), $("html, body").animate({
                scrollTop: 0
            }, t), !1
        });
        /* #END Button Backtop */

        /* Header Transition shadowbox */
        $(window).scroll(function() {
            var maxtopscroll= 80,
                search      = $('#search'),
                toggleSearch= $('#js-toggle-search'),
                overlay     = $('#js-overlay'),
                speed       = 300;

            if($(this).scrollTop() > maxtopscroll) {
                $(".header-area").addClass('active') 
                search.hide(speed)
                toggleSearch.css('opacity', '1')
                overlay.removeClass('visible')
            }
            else {
                $(".header-area").removeClass('active')
            }
        }), 
        /* #END Header Transition shadowbox */

        /* Leftsidebar Slide */
        $('#js-toggle-navicon').on('click', function() {
            /* Deklarasi Animate Target element */
            var body        = $('body'),
                rowrap      = $('.header-area .rowrap'),
                leftSidebar = $('#js-leftsidebar'),
                speed       = 300;
            // excute
            setTimeout(function() {
                body.addClass('pageslide');
                leftSidebar.animate({ left : 0 }, speed);
                rowrap.animate({ margin:'0px 0px 0px 300px !important', 'max-width':'inherit !important' }, speed);
                return false;
            }, speed);
        });
        /* #END Leftsidebar Slide */

        /* Leftsidebar Swipe Left */
        $('#js-leftsidebar').on('swipeleft', function() {
            /* Deklarasi Animate Target element */
            var body        = $('body'),
                rowrap      = $('.header-area .rowrap'),
                leftSidebar = $('#js-leftsidebar'),
                speed       = 300;
            // excute
            body.removeClass('pageslide');
            leftSidebar.animate({ left : '-300px' }, speed);
            rowrap.removeAttr('style').animate({ 'margin':'0px auto !important' }, speed);
        });
        /* #EMD Leftsidebar Swipe Left */

        /* Overlay Click */
        $('#js-overlay').on('click', function() {
            /* Deklarasi Animate Target element */
            var body        = $('body'),
                rowrap      = $('.header-area .rowrap'),
                leftSidebar = $('#js-leftsidebar'),
                search      = $('#search'),
                toggleSearch= $('#js-toggle-search'), 
                speed       = 300;
            // excute
            body.removeClass('pageslide');
            leftSidebar.animate({ left : '-300px' }, speed);
            rowrap.removeAttr('style').animate({ 'margin':'0px auto !important' }, speed);
            search.hide(speed);
            toggleSearch.css('opacity', '1');
            $(this).removeClass('visible');
            return false;
        });
        /* #END Overlay Click */

        /* Onload Preloader Image with plugin pace.js */
        paceOptions = {
            ajax: false, // Monitors all ajax requests on the page
            document: true, // Checks for the existance of specific elements on the page
            eventLag: true, // Checks the document readyState
            elements: {
                selectors: ['html'] // Checks for event loop lag signaling that javascript is being executed
            }
        };
        // starting load element
        $('.card-img-box').append('<div class="preloader"><div class="preloader-main"><svg viewBox="0 0 75 75"><circle cx="37.5" cy="37.5" r="33.5" class="pl-blue-grey" stroke-width="5"></circle></svg></div></div>');
        // after load success
        Pace.on('done', function() {
            setTimeout(function(){
                /* Show Content After Document full load*/
                $('#styleliveonload').remove();
                $('.window-preloader').remove();
                $('.content').fadeIn('100');
                $('.card-img-box').find('.preloader').remove();
                $('body').removeClass('pace-done');
                $('.pace').remove();
            }, 500);
        });
        /* #END Onload Preloader Image */

        /* Toggle Menu Sidebar */
        $.each($('.menu-toggle.toggled'), function (i, val) {
            $(val).next().slideToggle(0);
        });

        /* When page load */
        $.each($('.menu .list li.active'), function (i, val) {
            var $activeAnchors = $(val).find('a:eq(0)');
            $activeAnchors.addClass('toggled');
            $activeAnchors.next().show();
        });

        /* Collapse or Expand Menu */
        $('.menu-toggle').on('click', function(e) {
            var $this = $(this);
            var $content = $this.next();
            if ($($this.parents('ul')[0]).hasClass('list')) {
                var $not = $(e.target).hasClass('menu-toggle') ? e.target : $(e.target).parents('.menu-toggle');
                $.each($('.menu-toggle.toggled').not($not).next(), function (i, val) {
                    if ($(val).is(':visible')) {
                        $(val).prev().toggleClass('toggled');
                        $(val).slideUp();
                    }
                });
            }
            $this.toggleClass('toggled');
            $content.slideToggle(320);
        });      
    }
} 
// #END $.ws.init

// $.ws.materialcard
$.ws.materialcard = {
	activate : function() {
		$('.material-card > .mc-btn-action').click(function () {
			var card = $(this).parent('.material-card');
			var icon = $(this).children('i');
			icon.addClass('fa-spin-fast');
			if (card.hasClass('mc-active')) {
				card.removeClass('mc-active');
				window.setTimeout(function() {
					icon
						.removeClass('fa-arrow-left')
						.removeClass('fa-spin-fast')
						.addClass('fa-bars');

				}, 800);
			} else {
				card.addClass('mc-active');
				window.setTimeout(function() {
					icon
						.removeClass('fa-bars')
						.removeClass('fa-spin-fast')
						.addClass('fa-arrow-left');

				}, 800);
			}
		});
	}
}
// #END $.ws.materialcard

// $.ws.socialstats
$.ws.socialstats = { 
    activate : function() {
        (function($){$.fn.SocialCounter=function(options){var settings=$.extend({twitter_user:'',facebook_user:'',facebook_token:'',instagram_user:'',instagram_user_sandbox:'',instagram_token:'',google_plus_id:'',google_plus_key:'',linkedin_oauth:'',youtube_user:'',youtube_user_square:'',youtube_key:'',vine_user:'',pinterest_user:'',dribbble_user:'',dribbble_token:'',soundcloud_user_id:'',soundcloud_client_id:'',vimeo_user:'',vimeo_token:'',github_user:'',behance_user:'',behance_client_id:'',vk_id:'',foursquare_user:'',foursquare_token:'',tumblr_username:'',twitch_username:'',twitch_client_id:'',spotify_artist_id:'',spotify_user_id:''},options)
            function pinterest(){$.ajax({url:'https://api.pinterest.com/v3/pidgets/users/'+settings.pinterest_user+'/pins',dataType:'jsonp',type:'GET',success:function(data){var followers=parseInt(data.data.user.follower_count);var k=kFormatter(followers);$('#social-stats .item.pinterest .count').html(k);$('#social-stats .item.pinterest').attr('href','https://pinterest.com/'+settings.pinterest_user);getTotal(followers)}})}
            function dribbble(){$.ajax({url:'https://api.dribbble.com/v1/users/'+settings.dribbble_user,dataType:'json',type:'GET',data:{access_token:settings.dribbble_token},success:function(data){var followers=parseInt(data.followers_count);var k=kFormatter(followers);$('#social-stats .item.dribbble .count').html(k);$('#social-stats .item.dribbble').attr('href','https://dribbble.com/'+settings.dribbble_user);getTotal(followers)}})}
            function facebook(){$.ajax({url:'https://graph.facebook.com/v2.8/'+settings.facebook_user,dataType:'json',type:'GET',data:{access_token:settings.facebook_token,fields:'fan_count'},success:function(data){var followers=parseInt(data.fan_count);var k=kFormatter(followers);$('#social-stats .item.facebook .count').html(k);$('#social-stats .item.facebook').attr('href','https://facebook.com/'+settings.facebook_user);getTotal(followers)}})}
            function instagram(){$.ajax({url:'https://api.instagram.com/v1/users/self/',dataType:'jsonp',type:'GET',data:{access_token:settings.instagram_token},success:function(data){var followers=parseInt(data.data.counts.followed_by);var k=kFormatter(followers);$('#social-stats .item.instagram .count').html(k);$('#social-stats .item.instagram').attr('href','https://instagram.com/'+settings.instagram_user);getTotal(followers)}})}
            function instagram_sandbox(){$.ajax({url:'https://api.instagram.com/v1/users/search?q='+settings.instagram_user_sandbox,dataType:'jsonp',type:'GET',data:{access_token:settings.instagram_token},success:function(data){$.each(data.data,function(i,item){if(settings.instagram_user_sandbox==item.username){$.ajax({url:"https://api.instagram.com/v1/users/"+item.id,dataType:'jsonp',type:'GET',data:{access_token:settings.instagram_token},success:function(data){var followers=parseInt(data.data.counts.followed_by);var k=kFormatter(followers);$('#social-stats .instagram_sandbox .count').html(k);$('#social-stats .item.instagram_sandbox').attr('href','https://instagram.com/'+settings.instagram_user_sandbox);getTotal(followers)}})}})}})}
            function google(){$.ajax({url:'https://www.googleapis.com/plus/v1/people/'+settings.google_plus_id,type:"GET",dataType:"json",data:{key:settings.google_plus_key},success:function(data){var followers=parseInt(data.circledByCount);var k=kFormatter(followers);$("#social-stats .item.google .count").html(k);$('#social-stats .item.google').attr('href','https://plus.google.com/'+settings.google_plus_id);getTotal(followers)}})}
            function youtube(){$.ajax({url:'https://www.googleapis.com/youtube/v3/channels',dataType:'jsonp',type:'GET',data:{part:'statistics',forUsername:settings.youtube_user,key:settings.youtube_key},success:function(data){var subscribers=parseInt(data.items[0].statistics.subscriberCount);var k=kFormatter(subscribers);$('#social-stats .item.youtube .count').html(k);$('#social-stats .item.youtube').attr('href','https://youtube.com/'+settings.youtube_user);getTotal(subscribers)}})}
            function youtubeSquare(){$.ajax({url:'https://www.googleapis.com/youtube/v3/channels',dataType:'jsonp',type:'GET',data:{part:'statistics',forUsername:settings.youtube_user_square,key:settings.youtube_key},success:function(data){var subscribers=parseInt(data.items[0].statistics.subscriberCount);var k=kFormatter(subscribers);$('#social-stats .item.youtube_square .count').html(k);$('#social-stats .item.youtube_square').attr('href','https://youtube.com/'+settings.youtube_user_square);getTotal(subscribers)}})}
            function soundcloud(){$.ajax({url:'http://api.soundcloud.com/users/'+settings.soundcloud_user_id,dataType:'json',type:'GET',data:{client_id:settings.soundcloud_client_id},success:function(data){var followers=parseInt(data.followers_count);var k=kFormatter(followers);$('#social-stats .item.soundcloud .count').html(k);$('#social-stats .item.soundcloud').attr('href',data.permalink_url);getTotal(followers)}})}
            function vimeo(){$.ajax({url:'https://api.vimeo.com/users/'+settings.vimeo_user+'/followers',dataType:'json',type:'GET',data:{access_token:settings.vimeo_token},success:function(data){var followers=parseInt(data.total);$('#social-stats .item.vimeo .count').html(followers).digits();$('#social-stats .item.vimeo').attr('href','https://vimeo.com/'+settings.vimeo_user);getTotal(followers)}})}
            function twitter(){$.ajax({url:'//www.juanvargas.net/SocialCounters/twitter/index.php',dataType:'json',type:'GET',data:{user:settings.twitter_user},success:function(data){var followers=parseInt(data.followers);$('#social-stats .item.twitter .count').html(followers).digits();$('#social-stats .item.twitter').attr('href','https://twitter.com/'+settings.twitter_user);getTotal(followers)}})}
            function github(){$.ajax({url:'https://api.github.com/users/'+settings.github_user,dataType:'json',type:'GET',success:function(data){var followers=parseInt(data.followers);var k=kFormatter(followers);$('#social-stats .item.github .count').html(k);$('#social-stats .item.github').attr('href','https://github.com/'+settings.github_user);getTotal(followers)}})}
            function behance(){$.ajax({url:'https://api.behance.net/v2/users/'+settings.behance_user,dataType:'jsonp',type:'GET',data:{client_id:settings.behance_client_id},success:function(data){var followers=parseInt(data.user.stats.followers);var k=kFormatter(followers);$('#social-stats .item.behance .count').html(k);$('#social-stats .item.behance').attr('href','https://behance.net/'+settings.behance_user);getTotal(followers)}})}
            function vine(){$.ajax({url:'http://www.juanvargas.net/SocialCounters/vine/vine.php',dataType:'json',type:'GET',data:{user:settings.vine_user},success:function(data){var followers=parseInt(data.followers);var k=kFormatter(followers);$('#social-stats .item.vine .count').html(k);$('#social-stats .item.vine').attr('href','https://vine.co/u/'+settings.vine_user);getTotal(followers)}})}
            function vk(){$.ajax({url:'https://api.vk.com/method/users.getFollowers',dataType:'jsonp',type:'GET',data:{user_id:settings.vk_id},success:function(data){var followers=parseInt(data.response.count);var k=kFormatter(followers);$('#social-stats .item.vk .count').html(k);$('#social-stats .item.vk').attr('href','https://vk.com/id'+settings.vk_id);getTotal(followers)}})}
            function foursquare(){$.ajax({url:'https://api.foursquare.com/v2/users/search',dataType:'jsonp',type:'GET',data:{twitter:settings.foursquare_user,oauth_token:settings.foursquare_token,v:'20131017',},success:function(data){var id=data.response.results[0].id;$.ajax({url:'https://api.foursquare.com/v2/users/'+id,dataType:'jsonp',type:'GET',data:{oauth_token:settings.foursquare_token,v:'20131017'},success:function(data){var followers=parseInt(data.response.user.friends.count);var k=kFormatter(followers);$('#social-stats .item.foursquare .count').html(k);$('#social-stats .item.foursquare').attr('href','https://foursquare.com/'+settings.foursquare_user);getTotal(followers)}})}})}
            function linkedin(){$.ajax({url:'https://api.linkedin.com/v1/people/~:(num-connections,public-profile-url)',dataType:'jsonp',type:'GET',data:{oauth2_access_token:settings.linkedin_oauth,format:'jsonp'},success:function(data){var connections=parseInt(data.numConnections);var k=kFormatter(connections);$('#social-stats .item.linkedin .count').html(k);$('#social-stats .item.linkedin').attr('href',data.publicProfileUrl);getTotal(connections)}})}
            function tumblr(){$.ajax({url:'http://www.juanvargas.net/SocialCounters/tumblr/callback.php',dataType:'json',type:'GET',data:{user:settings.tumblr_username},success:function(data){var followers=parseInt(data.followers);var k=kFormatter(followers);$('#social-stats .item.tumblr .count').html(k);$('#social-stats .item.tumblr').attr('href','https://'+settings.tumblr_username+'.tumblr.com');getTotal(followers)}})}
            function twitch(){$.ajax({url:'https://api.twitch.tv/kraken/channels/'+settings.twitch_username,dataType:'json',type:'GET',data:{client_id:settings.twitch_client_id},success:function(data){var followers=parseInt(data.followers);var k=kFormatter(followers);$('#social-stats .item.twitch .count').html(k);$('#social-stats .item.twitch').attr('href','https://www.twitch.tv/'+settings.twitch_username+'/profile');getTotal(followers)}})}
            function spotifyArtist(){$.ajax({url:'https://api.spotify.com/v1/artists/'+settings.spotify_artist_id,dataType:'json',type:'GET',success:function(data){var followers=parseInt(data.followers.total);var k=mFormatter(followers);$('#social-stats .item.spotify_artist .count').html(k);$('#social-stats .item.spotify_artist').attr('href','https://open.spotify.com/artist/'+settings.spotify_artist_id);getTotal(followers)}})}
            function spotifyUser(){$.ajax({url:'https://api.spotify.com/v1/users/'+settings.spotify_user_id,dataType:'json',type:'GET',success:function(data){var followers=parseInt(data.followers.total);var k=mFormatter(followers);$('#social-stats .item.spotify_user .count').html(k);$('#social-stats .item.spotify_user').attr('href','https://open.spotify.com/users/'+settings.spotify_user_id);getTotal(followers)}})}
            $.fn.digits=function(){return this.each(function(){$(this).text($(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g,"$1,"))})}
            function kFormatter(num){return num>999?(num/1000).toFixed(1)+'k':num}
            function mFormatter(num){return num>999999?(num/1000000).toFixed(1)+'m':num}
            var total=0;function getTotal(data){total=total+data;$("#total").html(total).digits();$("#total_k").html(kFormatter(total))}
            function linkClick(){$('#social-stats .item').attr('target','_blank')}
            linkClick();if(settings.twitter_user!=''){twitter()}if(settings.facebook_user!=''&&settings.facebook_token!=''){facebook()}if(settings.instagram_user!=''&&settings.instagram_token!=''){instagram()}if(settings.instagram_user_sandbox!=''&&settings.instagram_token!=''){instagram_sandbox()}if(settings.google_plus_id!=''&&settings.google_plus_key!=''){google()}if(settings.linkedin_oauth!=''){linkedin()}if(settings.youtube_user!=''&&settings.youtube_key!=''){youtube()}if(settings.youtube_user_square!=''&&settings.youtube_key!=''){youtubeSquare()}if(settings.vine_user!=''){vine()}if(settings.pinterest_user!=''){pinterest()}if(settings.dribbble_user!=''&&settings.dribbble_token!=''){dribbble()}if(settings.soundcloud_user_id!=''&&settings.soundcloud_client_id!=''){soundcloud()}if(settings.vimeo_user!=''&&settings.vimeo_token!=''){vimeo()}if(settings.github_user!=''){github()}if(settings.behance_user!=''&&settings.behance_client_id!=''){behance()}if(settings.vk_id!=''){vk()}if(settings.foursquare_user!=''&&settings.foursquare_token!=''){foursquare()}if(settings.tumblr_username!=''){tumblr()}if(settings.twitch_username!=''&&settings.twitch_client_id!=''){twitch()}if(settings.spotify_artist_id!=''){spotifyArtist()}if(settings.spotify_user_id!=''){spotifyUser()}}}(jQuery))
    } // #end activated();
}
// #END $.ws.socialstats

// Cookie info
$.ws.cookie = {
    activate : function() {
        function getCookie(cname) {
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for(var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        }

        if(getCookie('cookieconsent_status') == '') {
            window.cookieconsent.initialise({
                palette: {
                    popup: {
                        background:"#607D8B;"
                    },
                    button: {
                        background:"#fff",
                        text:"#607D8B;"
                    }
                },
                showLink: false,
                position: "bottom-right",
                content : {
                    message : "Situs web ini menggunakan cookies untuk memastikan Anda mendapatkan pengalaman terbaik di situs kami.",
                    dismiss : "Mengerti",
                    link : "Belajar lagi"
                }
            });
        }

        $('.cc-btn').live('click', function() {
            $('.cc-window').remove();
            return false;
        });
    }
} 
// #END $.ws.cookie

// $ws.iframe
$.ws.iframe = {
	activate : function() {
		var wait = 500;
		$('#js-remove-frame').live('click', function() {
			setTimeout(function(){
				$('#js-iframe-view').removeAttr('style');
				$('[id^=js-iframe]').css('display', 'none');
				$('#js-iframe-view').css({ top : 0, padding : 0, height : "100%" });
				$('#js-iframe-show').css({ display : 'block' });
			}, wait);
			return false;
		});
		$('#js-toggle-frame-show').live('click', function() {
			setTimeout(function(){
				$('#js-iframe-view').removeAttr('style');
				$('[id^=js-iframe]').css('display', 'block');
				$('#js-iframe-view').css({ top : "54px" });
				$('#js-iframe-show').css({ display : 'none' });
			}, wait);
			return false;
		});
		$('#js-responsive-mobile').live('click', function() {
			setTimeout(function(){
				$('#js-iframe-view').css({ width: "425px", margin: "auto" });
			}, wait);
			return false;
		});
		$('#js-responsive-tablet').live('click', function() {
			setTimeout(function(){
				$('#js-iframe-view').css({ width: "768px", margin: "auto" });
			}, wait);
			return false;
		});
		$('#js-responsive-desktop').live('click', function() {
			setTimeout(function(){
				$('#js-iframe-view').css({ width: "100%", margin: "inherit" });
			}, wait);
			return false;
		});
	}
}
// #END $ws.iframe

// browser info
var edge = 'Microsoft Edge';
var ie10 = 'Internet Explorer 10';
var ie11 = 'Internet Explorer 11';
var opera = 'Opera';
var firefox = 'Mozilla Firefox';
var chrome = 'Google Chrome';
var safari = 'Safari';
$.ws.browser = {
    activate: function () {
        var _this = this;
        var className = _this.getClassName();
        if (className !== '') $('html').addClass(_this.getClassName());
    },
    getBrowser: function () {
        var userAgent = navigator.userAgent.toLowerCase();
        if (/edge/i.test(userAgent)) {
            return edge;
        } else if (/rv:11/i.test(userAgent)) {
            return ie11;
        } else if (/msie 10/i.test(userAgent)) {
            return ie10;
        } else if (/opr/i.test(userAgent)) {
            return opera;
        } else if (/chrome/i.test(userAgent)) {
            return chrome;
        } else if (/firefox/i.test(userAgent)) {
            return firefox;
        } else if (!!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/)) {
            return safari;
        }
        return undefined;
    },
    getClassName: function () {
        var browser = this.getBrowser();
        if (browser === edge) {
            return 'edge';
        } else if (browser === ie11) {
            return 'ie11';
        } else if (browser === ie10) {
            return 'ie10';
        } else if (browser === opera) {
            return 'opera';
        } else if (browser === chrome) {
            return 'chrome';
        } else if (browser === firefox) {
            return 'firefox';
        } else if (browser === safari) {
            return 'safari';
        } else {
            return '';
        }
    }
} 
//#end $.ws.browser

// Excute jQuery prototype if support make defer
window.addEventListener('DOMContentLoaded', function() {
    (function($) {
        $(document).ready(function() {
            // call function
            $.ws.init.activate();
            $.ws.cookie.activate();
            $.ws.browser.activate();
			$.ws.iframe.activate();
			$.ws.materialcard.activate();
        });
    })(jQuery);
});
// Excute jQuery prototype if not support defer
$(function() {
    $.ws.socialstats.activate();
});

/* javascript version
========================================*/
