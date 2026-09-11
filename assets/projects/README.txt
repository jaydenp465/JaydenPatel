Drop your project photos in these folders:

  arm/               3-DOF robotic arm
  fan-indicator/      Fan-speed color indicator
  baja-brakes/         Longhorn Baja brake rotor & wheel hub
  guadaloop-bogie/     Texas Guadaloop hyperloop bogie & braking
  ras-turret/          IEEE RAS Robomaster Sentry turret

Then in projects.html, swap each placeholder slide:

  <div class="slide ph"><span class="fig-num">FIG. 1</span><span>Full arm assembly</span></div>

for a real photo, e.g.:

  <div class="slide"><img src="assets/projects/arm/1.jpg" alt="3-DOF robotic arm, full assembly"></div>

Keep the class "slide" on the wrapper div — that's what the slideshow script looks
for. You can have as many slides per project as you want (1, 3, 6, whatever) —
just add or remove <div class="slide">...</div> blocks inside .slides.
Write a real, specific alt="" for each photo — that's what shows up if the image
fails to load and what screen readers announce.
