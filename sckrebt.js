// sckrebt.js - سلوك القائمة والتمرير والكشف عند التمرير
document.addEventListener('DOMContentLoaded', function(){

	/* Entry quiz logic: block access until correct answer */
	(function(){
		const overlay = document.getElementById('entry-quiz');
		const qEl = document.getElementById('quiz-question');
		const form = document.getElementById('quiz-form');
		const answerInput = document.getElementById('quiz-answer');
		const feedback = document.getElementById('quiz-feedback');

		if(!overlay || !form) return;

		// sports-themed arithmetic questions (Arabic)
		const questions = [
			{q: 'إن سجل لاعب 3 أهداف في كل مباراة لمدة 4 مباريات، كم هدفًا سجل؟', a: 12},
			{q: 'انتهت مباراة بنتيجة 3-2، ما مجموع الأهداف في المباراة؟', a: 5},
			{q: 'إذا فاز فريق في 3 مباريات وخسر في 2، كم عدد المباريات الإجمالية؟', a: 5},
			{q: 'سجل لاعب هدفين في كل من 5 مباريات، كم عدد الأهداف؟', a: 10},
			{q: 'تقدم فريق 4 أهداف ثم سجل الفريق الخصم هدفين، ما الفرق؟', a: 2}
		];

		let current;

		function pickQuestion(){
			current = questions[Math.floor(Math.random()*questions.length)];
			qEl.textContent = current.q;
			feedback.textContent = '';
			answerInput.value = '';
			answerInput.focus();
		}

		// prevent scrolling while overlay visible
		document.documentElement.style.overflow = 'hidden';
		document.body.style.overflow = 'hidden';

		pickQuestion();

		form.addEventListener('submit', function(e){
			e.preventDefault();
			const val = parseInt(answerInput.value.replace(/[^0-9\-]/g,''),10);
			if(!Number.isFinite(val)){
				feedback.textContent = 'الرجاء إدخال رقم صالح.';
				return;
			}
			if(val === current.a){
				// correct: show a friendly welcome message, then hide overlay
				const panel = overlay.querySelector('.quiz-panel');
				if(panel){
					panel.innerHTML = '<div class="welcome-panel"><h2>أحسنت!</h2><p>أهلاً بك يا صديق يوسف يرحب بك  — تم التحقق بنجاح، يمكنك الآن تصفح الموقع.</p></div>';
				}
				// small delay so user sees the welcome message
				setTimeout(()=>{
					overlay.setAttribute('aria-hidden','true');
					document.documentElement.style.overflow = '';
					document.body.style.overflow = '';
				}, 1500);
			} else {
				feedback.textContent = 'إجابة خاطئة — حاول سؤالاً آخر.';
				// pick another question after brief delay
				setTimeout(pickQuestion,700);
			}
		});
	})();

	const nav = document.querySelector('.nav');
	const toggle = document.querySelector('.nav-toggle');
	const links = document.querySelectorAll('.nav a');

	toggle && toggle.addEventListener('click', ()=>{
		nav.classList.toggle('open');
	});

	links.forEach(a=>a.addEventListener('click', ()=>{
		if(nav.classList.contains('open')) nav.classList.remove('open');
	}));

	// smooth scroll for internal links
	document.querySelectorAll('a[href^="#"]').forEach(a=>{
		a.addEventListener('click', function(e){
			const target = this.getAttribute('href');
			if(target.length>1){
				e.preventDefault();
				const el = document.querySelector(target);
				if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
			}
		});
	});

	// reveal on scroll
	const observer = new IntersectionObserver((entries)=>{
		entries.forEach(entry=>{
			if(entry.isIntersecting) entry.target.classList.add('active');
		});
	},{threshold:0.12});

	document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

});
