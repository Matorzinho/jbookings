<?php
	// echo "hello";
?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
	    <meta http-equiv="X-UA-Compatible" content="IE=edge">
	    <meta name="viewport" content="width=device-width, initial-scale=1.0">
		
		<title>JBookings</title>

		<!--Import Google Icon Font-->
      	<link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

	    <script type="text/javascript" src="https://code.jquery.com/jquery-2.1.1.min.js"></script>

    	<link href="css/materialize.min.css" rel="stylesheet">
    	<link href="css/style.css" rel="stylesheet">
	    <script src="js/materialize.min.js"></script>
	</head>
	<body>
		<script type="text/javascript">
			$(document).ready(function(){
				$('.parallax').parallax();
				setTimeout(function(){
					$('.login-div').addClass('come-in-left');
				}, 1000);
				$('.header-bg, .logo-txt').addClass('come-in-left');
				// $('.logo-txt').addClass('come-in-left');
			});
			var options = [
				{selector: '#how-works', offset: 150, callback: "$('#how-works .module').first().addClass('come-in-left');" },
				{selector: '#how-works', offset: 225, callback: "$('#how-works .module:nth-child(2)').addClass('come-in-bot')" },
				{selector: '#how-works', offset: 300, callback: "$('#how-works .module').last().addClass('come-in-right')" },
				{selector: '#feedback', offset: 300, callback: "Materialize.showStaggeredList('#feedback')" }
			];
			Materialize.scrollFire(options);
      		$(function(){
				$('#signup-btn').click(function(e){
					e.preventDefault();
					$('body').animate({
			            scrollTop: $('#signup-div').offset().top - 50
			        }, 1000); 
				});
				// $('#forgot-label').click(function(){
				// 	$('#login-screen').fadeOut(500, function(){
				// 		$('#forgot-screen').fadeIn(300);
				// 	});
				// });
				// $('#close-forgot').click(function(){
				// 	$('#forgot-screen').fadeOut(500, function(){

				// 		$('#login-screen').fadeIn(300);
				// 	});
				// });
			});
		</script>
		<div class="parallax-container header-parallax">
			<div class="parallax"><img src="imgs/img5.jpg"></div>
			<div class="container">
				<div class="row">
					<div class="col s12 header-wrapper">
						<div class="header-bg"></div>
							<h1 class="logo-txt">JBookings</h1>
					</div>
					<div class="login-div col s12 m6">
						<div class="row">
							<form class="col s12">
								<div class="row">
									<div class="input-field col s12">
										<i class="material-icons prefix">account_circle</i>
										<input id="icon_emai" type="email" class="validate">
										<label for="icon_email">Email</label>
									</div>
									<div class="input-field col s12">
										<i class="material-icons prefix">vpn_key</i>
										<input id="icon_pass" type="password" class="validate">
										<label for="icon_pass">Password</label>
									</div>
									<div class="col s12">
										<div class="row login-btns-row">
											<div class="col s6">
												<a class="waves-effect waves-light btn">Login</a>
											</div>
											<div class="col s6">
												<a id="signup-btn" class="waves-effect waves-light red btn">Sign Up</a>
											</div>
											<div class="col s12 forgot-div">
												<label class="forgot-lbl">Forgot your password? </label><div><a href="#">Click here!</a></div>
											</div>
										</div>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="section first_section">
			<div class="row container">
				<h2 class="header">How it Works</h2>
				<div id="how-works" class="row">
					<div class="col s12 m4 module">
						<div class="center work">
						<i class="material-icons">grade</i>
						<p class="work-caption">Create</p>
						<p class="light center">Lorem ipsum dolor sit amet, eu ius inani scaevola. Mea tibique senserit id, habeo volumus quaerendum ea ius, has in cetero expetenda. Exerci blandit lucilius eam ut, mel ea dicat doming. Nam cetero dissentiet no, pertinacia honestatis sea ei, cum alii munere ad.</p>
						</div>
					</div>
					<div class="col s12 m4 module">
						<div class="center work">
							<i class="material-icons">description</i>
							<p class="work-caption">Record</p>
							<p class="light center">Duo impetus liberavisse cu, no tation singulis mandamus duo. Vel dolorem forensibus ut. Vel an tempor omnesque, pri odio dolor id. Mei amet quando gubergren et. In vim audiam officiis, ei est odio utroque, pri et tacimates salutatus.</p>
						</div>
					</div>
					<div class="col s12 m4 module">
						<div class="center work">
							<i class="material-icons">group</i>
							<p class="work-caption">Share</p>
							<p class="light center">Mel ridens laboramus te. Sint nihil tamquam vix ut, ei mea quodsi malorum, no vel habeo elitr consectetuer. No qui dicta aeterno recusabo, per et menandri sententiae efficiantur. Option argumentum pro id, pro dicat quaerendum id.</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="parallax-container">
			<div class="parallax"><img src="imgs/img1.jpg"></div>
			<div class="container">
				<ul class="row" id="feedback">
					<li class="col s12 m8 offset-m2 l8 offset-l2" style="margin: 5px 0;">
						<div class="card-panel grey lighten-5 z-depth-1">
							<div class="row valign-wrapper" style="margin-bottom: 0px">
								<div class="col s3 m3 l2" style="height: 70px">
									<img src="imgs/profile1.jpg" alt="" class="circle responsive-img">
								</div>
								<div class="col s9 m9 l10">
									<span class="black-text">"Lorem ipsum dolor sit amet, eu ius inani scaevola."</span>
								</div>
							</div>
						</div>
					</li>
					<li class="col s12 m8 offset-m2 l8 offset-l2" style="margin: 5px 0;">
						<div class="card-panel grey lighten-5 z-depth-1">
							<div class="row valign-wrapper" style="margin-bottom: 0px">
								<div class="col s3 m3 l2" style="height: 70px">
									<img src="imgs/profile2.jpg" alt="" class="circle responsive-img">
								</div>
								<div class="col s9 m9 l10">
									<span class="black-text">"Eam dolore pertinax voluptatum ei."</span>
								</div>
							</div>
						</div>
					</li>
					<li class="col s12 m8 offset-m2 l8 offset-l2" style="margin: 5px 0;">
						<div class="card-panel grey lighten-5 z-depth-1">
							<div class="row valign-wrapper" style="margin-bottom: 0px">
								<div class="col s3 m3 l2" style="height: 70px">
									<img src="imgs/profile3.jpg" alt="" class="circle responsive-img">
								</div>
								<div class="col s9 m9 l10">
									<span class="black-text">"Vidit omittam reprehendunt cu usu, nullam epicurei maluisset vim id, impedit perfecto vituperata eu vis."</span>
								</div>
							</div>
						</div>
					</li>
					<li class="col s12 m8 offset-m2 l8 offset-l2" style="margin: 5px 0;">
						<div class="card-panel grey lighten-5 z-depth-1">
							<div class="row valign-wrapper" style="margin-bottom: 0px">
								<div class="col s3 m3 l2" style="height: 70px">
									<img src="imgs/profile4.png" alt="" class="circle responsive-img">
								</div>
								<div class="col s9 m9 l10">
									<span class="black-text">"Eum invenire honestatis in. Eum erant virtute in, sit verear dolorum ad."</span>
								</div>
							</div>
						</div>
					</li>
				</ul>	
			</div>
		</div>
		<div id="signup-div" class="section second_section">
			<div class="row container">

				<h2 class="header">Join us Now!</h2>
				<p style="font-size: 15px; font-weight: bold; text-align: center">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.</p>

				<div class="row">
							<form class="col s12">
								<div class="row">
									<div class="input-field col s12">
										<i class="material-icons prefix">account_circle</i>
										<input id="icon_emai" type="email" class="validate">
										<label for="icon_email">Email</label>
									</div>
									<div class="input-field col s12">
										<i class="material-icons prefix">vpn_key</i>
										<input id="icon_pass" type="password" class="validate">
										<label for="icon_pass">Password</label>
									</div>
									<div class="input-field col s12">
										<i class="material-icons prefix">repeat</i>
										<input id="icon_confirm" type="password" class="validate">
										<label for="icon_confirm">Confirm Password</label>
									</div>
									<div class="col s12">
										<div class="row login-btns-row">
											<div class="col s6">
												<a class="waves-effect waves-light btn">Submit!</a>
											</div>
										</div>
									</div>
								</div>
							</form>
						</div>
			</div>
		</div>
		<div class="parallax-container">
			<div class="parallax"><img src="imgs/img2.jpg"></div>
			
		</div>
	</body>
	<footer class="page-footer">
		<div class="container">
			<div class="row">
			<div class="col l6 s12">
				<h5 class="white-text">JBookings</h5>
				<p class="grey-text text-lighten-4">I always wanted to be a footer!</p>
			</div>
				<div class="col l4 offset-l2 s12">
					<h5 class="white-text">Check these out as well!</h5>
					<ul>
						<li class="valign-wrapper" style="margin-bottom:10px"><img src="imgs/github-icon.png" style="height: 25px; margin-right: 5px"></img><a class="grey-text text-lighten-3" href="www.github.com/Matorzinho">/Matorzinho</a></li>
						<li class="valign-wrapper" style="margin-bottom:10px"><img src="imgs/linkedin-icon.png" style="height: 25px; margin-right: 5px"></img><a class="grey-text text-lighten-3" href="https://ie.linkedin.com/in/dougbacelar">/in/dougbacelar/en</a></li>
						<!-- <li><a class="grey-text text-lighten-3" href="#!">dougbacelar@gmail.com</a></li> -->
					</ul>
				</div>
			</div>
		</div>
		<div class="footer-copyright">
			<div class="container">
			© 2014 Copyright Doug!
			<a class="grey-text text-lighten-4 right" href="#!">dougbacelar@gmail.com</a>
			</div>

		</div>
    </footer>
</html>