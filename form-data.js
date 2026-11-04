/* Solo Lifting form guides. One entry per exercise id.
   view/base/A/B/eq/anchor drive the animated figure (see form.js). Text fields drive the guide.
   mistakes: [title, what happens, fix, optional animation override { A, B, red: [muscles], ring: joint, wobble, tempo }] */
(function () {
  const SEAT_S = { px: 150, py: 196, t: 180, lN: 90, kN: 0, lF: 90, kF: 0 };              // seated, side view
  const SEAT_F = { px: 170, py: 182, lL: -14, sLL: .32, kL: -4, lR: 14, sLR: .32, kR: 4 };  // seated, front view (thighs toward you)
  const STAND_F = { px: 196, py: 152 };
  const seatS = [{ rect: [118, 202, 52, 9] }, { rect: [140, 211, 7, 25] }];
  const backPadS = [{ rect: [126, 126, 9, 74] }];
  const seatF = [{ rect: [134, 186, 72, 10] }, { rect: [150, 100, 40, 88] }];
  const SH = "Shoulder first: light enough for clean reps, shoulder blades gently down and back, and stop if anything pinches.";

  window.SL_FORM = {
    "chest-press": {
      view: "side", base: SEAT_S, A: { aN: -60, eN: 95, aF: -60, eF: 95 }, B: { aN: 86, eN: 88, aF: 86, eF: 88 },
      eq: [...seatS, ...backPadS, { rect: [262, 30, 16, 206] }, { arm: [[268, 70], "hN"], front: true }, { handle: "hN", front: true }],
      setup: ["Seat height so the handles line up with the middle of your chest.", "Back flat on the pad, feet flat on the floor.", "Shoulder blades down and back before you push, and keep them there."],
      rep: ["Press the handles forward until your arms are straight, without locking hard.", "Keep your shoulders pinned back at the end; don't let them roll forward to reach.", "Come back slowly over 2 seconds until your hands are level with your chest."],
      feel: ["Chest, with some front shoulder and triceps.", "The front of the shoulder joint itself. If it aches, lower the seat or shorten the range."],
      cues: ["Chest up, shoulders back.", "Elbows about 45° from your body, not flared straight out.", "Push the handles away, not up."],
      mistakes: [
        ["Shoulders rolling forward", "Reaching at the end of the press lets the shoulders lift off the pad, which takes the chest out of it.", "Finish with your shoulders still against the pad.", { B: { t: 168, aN: 90, aF: 90 }, ring: "shN" }],
        ["Half reps", "Stopping well short of the chest skips the stretch where the chest works hardest.", "Lower until your hands are level with your chest each rep.", { A: { aN: -20, eN: 92, aF: -20, eF: 92 } }],
        ["Elbows flared straight out", "Elbows level with your shoulders strains the front of the shoulder.", "Tuck them to about 45° from your sides."]],
      shoulder: "Keep the range comfortable: if the bottom of the rep pinches, stop a few centimetres short. " + SH
    },
    "incline-press": {
      view: "side", base: { ...SEAT_S, t: 205 }, A: { aN: -35, eN: 120, aF: -35, eF: 120 }, B: { aN: 125, eN: 125, aF: 125, eF: 125 },
      eq: [...seatS, { poly: [[139, 210], [131, 213], [101, 162], [109, 158]] }, { rect: [262, 20, 16, 216] }, { arm: [[268, 40], "hN"], front: true }, { handle: "hN", front: true }],
      setup: ["Seat so the handles start at upper-chest height.", "Back and head on the pad, feet flat.", "Shoulder blades down and back."],
      rep: ["Press up and slightly forward until your arms are straight.", "Pause briefly, keeping your shoulders on the pad.", "Lower slowly to upper-chest level."],
      feel: ["Upper chest and front shoulders.", "Neck or the top of the shoulder."],
      cues: ["Shoulders stay on the pad.", "Elbows about 45° from your sides.", "Slow on the way down."],
      mistakes: [
        ["Arching off the pad", "Lifting your chest and lower back turns it into a flat press and loads the lower back.", "Keep your back on the pad; lighten the weight.", { B: { t: 192 }, ring: "pel" }],
        ["Shoulders shrugging up", "Shoulders creeping toward your ears shifts the load onto the traps and shoulder joint.", "Pull your shoulders down before each rep."]],
      shoulder: "Incline pressing is often the most comfortable press for a cranky shoulder. Keep the elbows tucked. " + SH
    },
    "shoulder-press": {
      view: "front", base: SEAT_F, A: { aL: -86, eL: 175, aR: 86, eR: -175 }, B: { aL: -170, eL: -178, aR: 170, eR: 178 },
      eq: [...seatF, { handle: "hL", front: true }, { handle: "hR", front: true }],
      setup: ["Seat so the handles start at about chin to shoulder height.", "Back flat on the pad, feet planted.", "Ribs down: don't arch to push."],
      rep: ["Press straight up until your arms are almost straight.", "Keep your shoulders down away from your ears at the top.", "Lower slowly until your hands are level with your chin."],
      feel: ["Front and side of the shoulders, plus triceps.", "Neck and the tops of the shoulders, or a pinch inside the joint."],
      cues: ["Long neck at the top.", "Elbows slightly in front of your body, not flared straight out.", "Ribs down, back on the pad."],
      mistakes: [
        ["Shrugging at the top", "Pushing the shoulders up into the ears makes the traps take over and squeezes the joint.", "Finish the press with your shoulders still down.", { B: { shrug: 10 }, red: ["traps"] }],
        ["Lowering too far", "Dropping the handles well below the chin puts the shoulder in its most vulnerable position.", "Stop at chin height.", { A: { aL: -60, eL: 160, aR: 60, eR: -160 }, ring: "shR" }],
        ["Arching the lower back", "Leaning back turns it into a chest press and loads the lower back.", "Keep your back flat on the pad; go lighter."]],
      shoulder: "Overhead pressing is the most likely press to bother your left shoulder. Start light, and if it pinches, swap to the incline press for a few weeks. " + SH
    },
    "lateral-raise": {
      view: "front", oneSide: "R", base: STAND_F, A: { aR: 12, eR: 0, aL: -55, eL: -80 }, B: { aR: 88, eR: 76 },
      eq: [{ rect: [96, 20, 18, 216] }, { pulley: [118, 224] }, { cable: [[118, 224], "hR"], front: true }, { handle: "hR", front: true }],
      guide: [222, 100, 314, 100, 240, 95, "shoulder height"],
      setup: ["Pulley at the lowest setting, single handle.", "Stand side-on to the stack. Hold the handle in the far hand so the cable runs in front of you.", "Hold the machine with your other hand, soft knees.", "Shoulder blades gently down and back, chest up, long neck."],
      rep: ["Push the handle out to the side, elbow leading, arm about 30° in front of your body.", "Stop at shoulder height.", "Pause for a beat.", "Lower over 2 seconds, stopping before the plates touch."],
      feel: ["Outside of the shoulder (side delt).", "Top of the shoulder or neck (traps). If you do, it's too heavy or you're shrugging."],
      cues: ["Push out, not up.", "Elbow leads, hand follows.", "Shoulders stay down; long neck.", "Thumb level or slightly up."],
      mistakes: [
        ["Shrugging", "The traps lift the weight and your neck takes the load.", "Go lighter and set the shoulders down before every rep.", { B: { shrug: 10 }, red: ["traps"] }],
        ["Going too high", "Above shoulder height the joint can pinch and the delt stops doing the work.", "Stop at shoulder height.", { B: { aR: 125, eR: 115 }, ring: "shR" }],
        ["Swinging", "Leaning and bouncing moves the weight with momentum instead of the muscle.", "Stand still, go lighter, slow on the way down.", { wobble: 7, wobbleKeys: { t: 1 } }],
        ["Thumb pointing down", "\"Pouring the jug\" rotates the shoulder inward and is a common cause of pinching.", "Keep the thumb level or slightly up."]],
      shoulder: "For the next few weeks use a weight you can do for 15 clean reps. Do the left side first while it's fresh, then match the right side to it. If it pinches near the top, stop a little lower (around 70°) and bring the arm a touch more forward."
    },
    "rear-delt": {
      view: "front", back: true, base: SEAT_F, A: { aL: -90, eL: -90, sL: .3, aR: 90, eR: 90, sR: .3 }, B: { aL: -94, eL: -94, sL: 1, aR: 94, eR: 94, sR: 1 },
      eq: [{ rect: [152, 70, 36, 130] }, { rect: [134, 186, 72, 10] }, { handle: "hL", front: true }, { handle: "hR", front: true }],
      setup: ["Sit facing the pad, chest against it. (Shown from behind.)", "Handles at shoulder height, arms out in front.", "Shoulders down, neck long."],
      rep: ["Sweep your arms out and back in a wide arc, arms almost straight.", "Stop when your arms are in line with your body.", "Return slowly until your hands nearly meet."],
      feel: ["Back of the shoulders and between the shoulder blades.", "Neck and traps."],
      cues: ["Reach wide, not back.", "Lead with the back of your hand.", "Shoulders stay down."],
      mistakes: [
        ["Shrugging", "The traps take over and the rear delts do little.", "Lighter weight, shoulders down before each rep.", { B: { shrug: 10 }, red: ["traps"] }],
        ["Bending the arms into a row", "Bending the elbows turns it into a row for the upper back.", "Keep a soft but fixed bend in the elbows."],
        ["Squeezing too far back", "Pulling past your body pinches the shoulder blades and strains the front of the shoulder.", "Stop when your arms line up with your body."]],
      shoulder: "This is one of the best exercises for a cranky shoulder: it strengthens the muscles that hold the joint back and centred. " + SH
    },
    "lat-pulldown": {
      view: "front", base: SEAT_F, A: { aL: -160, eL: -170, aR: 160, eR: 170 }, B: { aL: -35, eL: -172, aR: 35, eR: 172 },
      eq: [{ pulley: [170, 14] }, { cable: [[170, 14], "hC"] }, { bar: ["hL", "hR"], ext: 14, front: true }, { rect: [134, 186, 72, 10] }, { pad: "kL", dy: -8, r: 6, front: true }, { pad: "kR", dy: -8, r: 6, front: true }],
      setup: ["Thigh pad snug so you don't lift off.", "Grip a little wider than your shoulders.", "Sit tall with a slight lean back, chest up."],
      rep: ["Start by pulling your shoulders down (a small movement), then pull the bar to your upper chest.", "Squeeze your shoulder blades down and back at the bottom.", "Let the bar rise slowly until your arms are straight and you feel a stretch."],
      feel: ["Lats (sides of your back) and between the shoulder blades.", "Mostly biceps or forearms: think about pulling with your elbows."],
      cues: ["Shoulders down first, then arms.", "Pull your elbows to your back pockets.", "Chest up to meet the bar."],
      mistakes: [
        ["Leaning way back", "Swinging back turns it into a row and uses momentum.", "Only a slight lean; stay still.", { B: { t: 200 }, wobble: 4 }],
        ["Shoulders up at the top", "Letting the shoulders shrug up at the top strains the joint and skips the lat stretch.", "Keep a little tension: shoulders away from your ears.", { A: { shrug: 9 }, red: ["traps"] }],
        ["Pulling behind the neck", "Behind-the-neck pulldowns force the shoulder into an awkward position.", "Always pull to the front, to your upper chest."]],
      shoulder: "Pull to the upper chest only, and keep the shoulders down at the top of each rep. " + SH
    },
    "pullup": {
      view: "front", base: { px: 170, py: 150, lL: -6, kL: -4, lR: 6, kR: 4 }, anchor: { j: "hR", y: 40 },
      A: { aL: -165, eL: -170, aR: 165, eR: 170 }, B: { aL: -35, eL: -172, aR: 35, eR: 172 },
      eq: [{ line: [[110, 40], [230, 40]], w: 4 }, { pad: "kL", r: 7, front: true }, { pad: "kR", r: 7, front: true }],
      setup: ["Set the assist weight so you can do 8 to 12 clean reps (more weight makes it easier).", "Knees on the pad, grip slightly wider than your shoulders.", "Start hanging with straight arms and your shoulders pulled down a little."],
      rep: ["Pull your shoulders down, then drive your elbows down to pull your chin over the bar.", "Pause at the top.", "Lower slowly to straight arms."],
      feel: ["Lats and upper back, with biceps.", "Neck or a pinch in the front of the shoulder."],
      cues: ["Shoulders down first.", "Elbows to your back pockets.", "Chest to the bar."],
      mistakes: [
        ["Swinging", "Kicking and swinging uses momentum instead of your back.", "Slow, still reps; add assistance if needed.", { wobble: 6, wobbleKeys: { t: 1, lL: 3, lR: 3 } }],
        ["Half reps", "Not straightening the arms at the bottom misses the lat stretch.", "Full hang at the bottom of every rep.", { A: { aL: -110, eL: -170, aR: 110, eR: 170 } }]],
      shoulder: "Stay in control at the bottom; don't drop into the hang. " + SH
    },
    "cable-row": {
      view: "side", base: { px: 150, py: 205, t: 180, lN: 100, kN: 80, fN: 170, lF: 100, kF: 80, fF: 170 }, A: { t: 172, aN: 88, eN: 88, aF: 88, eF: 88 }, B: { t: 184, aN: -35, eN: 75, aF: -35, eF: 75 },
      eq: [{ rect: [122, 211, 54, 8] }, { rect: [285, 50, 18, 186] }, { pulley: [292, 198] }, { plate: ["anN", "toeN"] }, { cable: [[292, 198], "hN"], front: true }, { handle: "hN", front: true }],
      setup: ["Feet on the platform, knees slightly bent.", "Sit tall, chest up, a slight lean forward at the start only.", "Shoulders down."],
      rep: ["Pull the handle to your lower ribs, elbows close to your sides.", "Squeeze your shoulder blades together at the end.", "Let the arms straighten slowly and feel the stretch across your back."],
      feel: ["Middle of the back and lats.", "Lower back or neck."],
      cues: ["Chest up, sit tall.", "Elbows drive back past your body.", "Squeeze, pause, then slow."],
      mistakes: [
        ["Rocking", "Swinging the torso back and forth uses momentum and loads the lower back.", "Torso moves only a little; let the arms and back do it.", { A: { t: 150 }, B: { t: 205 } }],
        ["Shrugging", "Shoulders rising toward the ears turns it into a trap exercise.", "Shoulders down the whole time.", { B: { shrug: 8 }, red: ["traps"] }],
        ["Rounding the back", "Slumping forward at the stretch strains the lower back.", "Keep your chest up and back straight at the front of each rep."]],
      shoulder: "Rows strengthen the muscles that hold the shoulder back, which helps most shoulder pain. Keep the shoulders down. " + SH
    },
    "cs-row": {
      view: "side", base: { ...SEAT_S, t: 172 }, A: { aN: 82, eN: 84, aF: 82, eF: 84 }, B: { aN: -40, eN: 72, aF: -40, eF: 72 },
      eq: [...seatS, { rect: [184, 118, 9, 52] }, { rect: [262, 30, 16, 206] }, { arm: [[268, 60], "hN"], front: true }, { handle: "hN", front: true }],
      setup: ["Seat height so your chest sits on the pad and the handles are at shoulder height.", "Chest stays on the pad the whole set.", "Shoulders down."],
      rep: ["Drive your elbows back until your hands reach your ribs.", "Squeeze your shoulder blades together.", "Return slowly until your arms are straight."],
      feel: ["Middle back and lats.", "Biceps doing most of it: think elbows, not hands."],
      cues: ["Chest glued to the pad.", "Elbows back, not up.", "Squeeze for a beat."],
      mistakes: [
        ["Chest leaving the pad", "Leaning back to finish the rep uses momentum.", "Stay on the pad; go lighter.", { B: { t: 190 }, ring: "pel" }],
        ["Shrugging", "Lifting the shoulders turns it into a trap exercise.", "Shoulders down the whole set.", { B: { shrug: 8 }, red: ["traps"] }]],
      shoulder: "One of the safest pulls for a sore shoulder. " + SH
    },
    "leg-press": {
      view: "side", base: { px: 150, py: 200, t: 215, aN: 20, eN: 40, aF: 20, eF: 40 }, A: { lN: 140, kN: 70, fN: 165, lF: 140, kF: 70, fF: 165 }, B: { lN: 112, kN: 104, fN: 175, lF: 112, kF: 104, fF: 175 },
      eq: [{ rect: [125, 204, 45, 10] }, { poly: [[139, 208], [133, 213], [104, 162], [110, 158]] }, { line: [[218, 206], [300, 140]], w: 4 }, { plate: ["anN", "toeN"], front: true }],
      setup: ["Back and hips flat on the pad.", "Feet hip-width in the middle of the platform.", "Hold the side handles."],
      rep: ["Lower the platform until your knees are at about 90°, without your hips lifting off the seat.", "Push through your whole foot until your legs are almost straight.", "Don't lock your knees at the top."],
      feel: ["Front of the thighs and glutes.", "Lower back (your hips are curling up at the bottom)."],
      cues: ["Whole foot pushes, heels down.", "Knees follow your toes.", "Soft knees at the top."],
      mistakes: [
        ["Locking the knees", "Snapping the knees straight puts the load through the joint instead of the muscle.", "Stop just short of straight.", { B: { lN: 104, kN: 104, lF: 104, kF: 104 }, ring: "kN" }],
        ["Hips lifting at the bottom", "Going too deep curls the lower back off the pad.", "Only lower as far as your back stays flat.", { A: { lN: 152, kN: 64, lF: 152, kF: 64, t: 222 }, ring: "pel" }],
        ["Knees caving in", "Knees falling inward strains them.", "Push your knees out in line with your toes."]]
    },
    "leg-press-wide": {
      view: "side", base: { px: 150, py: 200, t: 215, aN: 20, eN: 40, aF: 20, eF: 40 }, A: { lN: 148, kN: 82, fN: 168, lF: 148, kF: 82, fF: 168 }, B: { lN: 118, kN: 112, fN: 178, lF: 118, kF: 112, fF: 178 },
      eq: [{ rect: [125, 204, 45, 10] }, { poly: [[139, 208], [133, 213], [104, 162], [110, 158]] }, { line: [[218, 206], [300, 140]], w: 4 }, { plate: ["anN", "toeN"], front: true }],
      setup: ["Feet high on the platform and wider than your hips, toes turned out a little.", "Back and hips flat on the pad."],
      rep: ["Lower until your knees are at about 90°, keeping your hips down.", "Push through your heels until your legs are almost straight.", "Don't lock out."],
      feel: ["Glutes, inner thighs and hamstrings more than the standard press.", "Lower back."],
      cues: ["Drive through your heels.", "Knees out over your toes.", "Soft knees at the top."],
      mistakes: [
        ["Hips lifting at the bottom", "Going too deep rolls your lower back off the pad.", "Lower only as far as your back stays flat.", { A: { lN: 158, kN: 76, lF: 158, kF: 76, t: 222 }, ring: "pel" }],
        ["Locking the knees", "Straight, locked knees take the load off the muscle.", "Stop just short of straight.", { B: { lN: 110, kN: 110, lF: 110, kF: 110 }, ring: "kN" }]]
    },
    "leg-ext": {
      view: "side", base: { ...SEAT_S, aN: 15, eN: 40, aF: 15, eF: 40 }, A: { kN: 8, fN: 95, kF: 8, fF: 95 }, B: { kN: 86, fN: 175, kF: 86, fF: 175 },
      eq: [...seatS, ...backPadS, { pad: "anN", dx: 5, r: 6, front: true }, { pad: "kN", dy: -9, r: 6, front: true }],
      setup: ["Back against the pad, knee joint lined up with the machine's pivot.", "Ankle pad sits on the front of your lower shin.", "Hold the side handles."],
      rep: ["Straighten your legs, squeezing the front of your thighs at the top.", "Pause for a beat.", "Lower slowly over 2 to 3 seconds."],
      feel: ["Front of the thighs (quads).", "Knee pain: shorten the range or lighten the weight."],
      cues: ["Squeeze at the top.", "Hips stay down on the seat.", "Slow on the way down."],
      mistakes: [
        ["Kicking the weight", "Kicking up fast and dropping it uses momentum.", "Smooth up, pause, slow down.", { tempo: { up: .35, top: 0, down: .5, bottom: 0 } }],
        ["Hips lifting", "Lifting your bum off the seat means it's too heavy.", "Lighter weight; hold the handles and stay seated.", { B: { py: 188 }, ring: "pel" }]]
    },
    "seated-curl": {
      view: "side", base: { ...SEAT_S, t: 195, aN: 15, eN: 40, aF: 15, eF: 40 }, A: { kN: 85, fN: 175, kF: 85, fF: 175 }, B: { kN: -20, fN: 70, kF: -20, fF: 70 },
      eq: [...seatS, { poly: [[134, 200], [126, 200], [113, 128], [121, 126]] }, { pad: "kN", dy: -10, r: 7, front: true }, { pad: "anN", dy: 6, r: 6, front: true }],
      setup: ["Knees lined up with the machine's pivot.", "Thigh pad locked down just above your knees.", "Ankle pad sits on the back of your lower calf."],
      rep: ["Curl your heels down and back as far as you can.", "Squeeze the backs of your thighs for a beat.", "Return slowly until your legs are straight."],
      feel: ["Backs of the thighs (hamstrings).", "Calf cramp: pull your toes toward you."],
      cues: ["Toes pulled up toward your shins.", "Hips stay back on the seat.", "Slow on the way up."],
      mistakes: [
        ["Hips lifting", "Lifting off the seat lets the lower back help.", "Lock the thigh pad down firmly; lighter weight.", { B: { py: 188 }, ring: "pel" }],
        ["Half reps", "Stopping short of a full bend misses the hardest part.", "Curl as far as the machine allows.", { B: { kN: 40, kF: 40 } }]]
    },
    "lying-curl": null, // filled below: same guide as the seated curl
    "hip-thrust": {
      view: "side", base: { px: 164, py: 200, aN: 50, eN: 70, aF: 50, eF: 70 }, anchor: { j: "sh", x: 118, y: 168 },
      A: { t: 235, lN: 95, kN: 0, lF: 95, kF: 0, h: -25 }, B: { t: 268, lN: 49, kN: 0, lF: 49, kF: 0, aN: 85, aF: 85, h: -60 },
      eq: [{ rect: [62, 172, 58, 12] }, { rect: [70, 184, 6, 52] }, { rect: [106, 184, 6, 52] }, { pad: "pel", dx: 3, dy: -11, r: 8, front: true }],
      setup: ["Upper back against the pad or bench edge, just below the shoulder blades.", "Feet flat, about hip-width, so your shins are vertical at the top.", "Pad or bar across your hips."],
      rep: ["Drive through your heels and squeeze your glutes to lift your hips.", "At the top your body is a straight line from knees to shoulders. Pause and squeeze.", "Lower slowly until your hips are just above the floor."],
      feel: ["Glutes, with some hamstrings.", "Lower back: you're arching instead of squeezing."],
      cues: ["Chin tucked, eyes forward.", "Push through the heels.", "Squeeze, don't arch."],
      mistakes: [
        ["Arching the lower back", "Overextending at the top shifts the work into the lower back.", "Stop when your body is flat; tuck your ribs down.", { B: { t: 282 }, ring: "pel" }],
        ["Feet too far forward", "Feet out in front turns it into a hamstring exercise.", "Shins vertical at the top."]]
    },
    "kickback": {
      view: "side", base: { px: 170, py: 158, t: 168, aN: 70, eN: 86, aF: 70, eF: 86, lF: 0, kF: 0 }, A: { lN: 8, kN: 4 }, B: { lN: -38, kN: -25 },
      eq: [{ rect: [244, 20, 18, 216] }, { pulley: [244, 226] }, { cable: [[244, 226], "anN"], front: true }, { pad: "anN", r: 4.5, front: true }],
      setup: ["Ankle strap on, low pulley.", "Face the machine and hold it, a slight lean forward.", "Standing knee soft, core braced."],
      rep: ["Push your working leg back and slightly up, squeezing the glute.", "Stop before your lower back arches.", "Return slowly."],
      feel: ["Glute of the working leg.", "Lower back."],
      cues: ["Squeeze the glute, don't swing.", "Hips stay square to the machine.", "Short and controlled beats big and sloppy."],
      mistakes: [
        ["Arching the lower back", "Kicking too high bends the lower back instead of extending the hip.", "Stop when your leg is just behind your body.", { B: { lN: -55, t: 190 }, ring: "pel" }],
        ["Swinging", "Using momentum takes the glute out of it.", "Slow and controlled, pause at the back.", { wobble: 6, wobbleKeys: { lN: 2, t: .5 } }]]
    },
    "abductor": {
      view: "front", base: { ...SEAT_F, aL: -18, eL: -5, aR: 18, eR: 5 }, A: { lL: -18, sLL: .32, lR: 18, sLR: .32 }, B: { lL: -78, sLL: .62, lR: 78, sLR: .62 },
      eq: [...seatF, { pad: "kL", dx: -8, r: 6, front: true }, { pad: "kR", dx: 8, r: 6, front: true }],
      setup: ["Pads on the outside of your knees.", "Sit tall, back on the pad.", "Hold the handles."],
      rep: ["Push your knees out as wide as is comfortable.", "Pause and squeeze at the outside of your hips.", "Return slowly, without letting the plates touch."],
      feel: ["Outside of your hips and glutes.", "Lower back or groin."],
      cues: ["Sit tall.", "Slow back in.", "Pause wide."],
      mistakes: [
        ["Rocking forward", "Leaning and rocking uses your body weight to move the pads.", "Sit tall against the pad; lighter weight.", { wobble: 6, wobbleKeys: { t: 1 } }],
        ["Letting it snap back", "Letting the weight pull your legs back fast skips half the work.", "Control it back in over 2 seconds."]]
    },
    "adductor": {
      view: "front", base: { ...SEAT_F, aL: -18, eL: -5, aR: 18, eR: 5 }, A: { lL: -78, sLL: .62, lR: 78, sLR: .62 }, B: { lL: -16, sLL: .32, lR: 16, sLR: .32 },
      eq: [...seatF, { pad: "kL", dx: 7, r: 6, front: true }, { pad: "kR", dx: -7, r: 6, front: true }],
      setup: ["Pads on the inside of your knees.", "Start with a comfortable stretch, not your widest.", "Sit tall, back on the pad."],
      rep: ["Squeeze your knees together.", "Pause when the pads meet.", "Let them open slowly to your start width."],
      feel: ["Inner thighs.", "A sharp pull in the groin: start narrower."],
      cues: ["Sit tall.", "Squeeze and pause.", "Open slowly."],
      mistakes: [
        ["Starting too wide", "Forcing a big stretch at the start can strain the groin.", "Start at a comfortable width and widen over weeks.", { A: { lL: -88, sLL: .5, lR: 88, sLR: .5 }, ring: "pel" }],
        ["Rocking", "Leaning forward to help squeeze uses momentum.", "Stay against the back pad.", { wobble: 6, wobbleKeys: { t: 1 } }]]
    },
    "calf": {
      view: "side", base: { px: 170, py: 158, aN: 40, eN: 80, aF: 40, eF: 80 }, anchor: { j: "toeN", x: 214, y: 222 }, A: { fN: 118, fF: 118 }, B: { fN: 52, fF: 52 },
      eq: [{ rect: [204, 222, 46, 14] }, { rect: [232, 60, 12, 176] }],
      setup: ["Balls of your feet on the edge of the step or plate, heels hanging off.", "Knees straight but not locked.", "Hold something for balance."],
      rep: ["Lower your heels slowly for a full stretch.", "Pause at the bottom (no bounce).", "Rise as high as you can onto your toes and squeeze."],
      feel: ["Calves.", "Achilles pain: shorten the stretch at the bottom."],
      cues: ["Pause at the bottom.", "All the way up.", "Slow, no bouncing."],
      mistakes: [
        ["Bouncing", "Bouncing out of the bottom uses the Achilles like a spring.", "Pause for a second at the bottom of every rep.", { tempo: { up: .4, top: 0, down: .4, bottom: 0 } }],
        ["Bending the knees", "Bending the knees to push turns it into a squat.", "Keep your legs straight.", { B: { kN: -15, lN: 12 }, ring: "kN" }]]
    },
    "crunch": {
      view: "side", base: { px: 160, py: 192, lN: 0, kN: -90, fN: 0, lF: 0, kF: -90, fF: 0 }, A: { t: 168, aN: 160, eN: 20, aF: 160, eF: 20 }, B: { t: 108, h: 25, aN: 100, eN: -40, aF: 100, eF: -40 },
      eq: [{ rect: [262, 10, 16, 226] }, { pulley: [262, 24] }, { cable: [[262, 24], "hN"], front: true }, { handle: "hN", front: true }],
      setup: ["Kneel facing the high pulley with the rope behind your head.", "Hands by your ears; they stay there.", "Hips stay still the whole set."],
      rep: ["Curl your ribs down toward your hips, rounding your back.", "Squeeze your abs at the bottom.", "Uncurl slowly."],
      feel: ["Abs.", "Arms or hip flexors: your arms are pulling or your hips are moving."],
      cues: ["Ribs to hips.", "Hips don't move.", "Exhale as you curl."],
      mistakes: [
        ["Bending at the hips", "Sitting back and bowing from the hips uses your body weight, not your abs.", "Hips stay over your knees; curl your spine instead.", { B: { t: 120, lN: -35, kN: -90, h: 5 }, ring: "pel" }],
        ["Pulling with the arms", "Pulling the rope down with your arms takes the abs out of it.", "Hands stay fixed by your head."]]
    },
    "back-ext": {
      view: "side", base: { px: 170, py: 150, lN: -45, kN: -45, fN: 45, lF: -45, kF: -45, fF: 45 }, A: { t: 20, aN: 200, eN: 30, aF: 200, eF: 30 }, B: { t: 135, aN: 320, eN: 165, aF: 320, eF: 165 },
      eq: [{ line: [[110, 214], [178, 146]], w: 5 }, { pad: "pel", dx: 7, dy: 5, r: 8 }, { pad: "anN", dx: 4, dy: 6, r: 6, front: true }, { line: [[110, 214], [110, 236]], w: 4 }, { line: [[180, 160], [200, 236]], w: 4 }],
      setup: ["Hip pad just below your hip bones so you can bend freely.", "Heels under the foot pads.", "Arms crossed over your chest."],
      rep: ["Lower your upper body slowly, keeping your back straight.", "Raise back up using your glutes and lower back.", "Stop when your body is in a straight line."],
      feel: ["Lower back and glutes.", "A pinch in the lower back at the top: you're going past straight."],
      cues: ["Straight line at the top, no further.", "Squeeze the glutes to come up.", "Slow and smooth."],
      mistakes: [
        ["Going past straight", "Arching up past a straight line squashes the lower back.", "Stop when your body lines up with your legs.", { B: { t: 160 }, ring: "pel" }],
        ["Jerking up", "Throwing yourself up uses momentum.", "Smooth up, pause, slow down.", { tempo: { up: .4, top: 0, down: .7, bottom: 0 } }]]
    },
    "cable-curl": {
      view: "side", base: { px: 170, py: 158 }, A: { aN: 2, eN: 5, aF: 2, eF: 5 }, B: { aN: 10, eN: 150, aF: 10, eF: 150 },
      eq: [{ rect: [262, 20, 16, 216] }, { pulley: [262, 226] }, { cable: [[262, 226], "hN"], front: true }, { handle: "hN", front: true }],
      setup: ["Low pulley, straight or EZ bar.", "Stand tall, elbows by your sides.", "Shoulders down and back."],
      rep: ["Curl the bar up toward your chest, keeping your elbows at your sides.", "Squeeze at the top.", "Lower slowly to straight arms."],
      feel: ["Biceps.", "Front of the shoulders or lower back."],
      cues: ["Elbows pinned to your sides.", "Stand still.", "Slow on the way down."],
      mistakes: [
        ["Elbows drifting forward", "Bringing the elbows forward lets the front of the shoulder lift the weight.", "Keep your elbows at your sides the whole rep.", { B: { aN: 45, aF: 45 }, ring: "eN" }],
        ["Swinging", "Leaning back to start the rep uses momentum.", "Stand still; lighter weight.", { wobble: 8, wobbleKeys: { t: -1 } }]]
    },
    "pushdown": {
      view: "side", base: { px: 170, py: 158, t: 172 }, A: { aN: 8, eN: 130, aF: 8, eF: 130 }, B: { aN: 8, eN: 4, aF: 8, eF: 4 },
      eq: [{ rect: [262, 10, 16, 226] }, { pulley: [262, 24] }, { cable: [[262, 24], "hN"], front: true }, { handle: "hN", front: true }],
      setup: ["High pulley, rope attachment.", "Stand close with a slight forward lean.", "Elbows tucked at your sides."],
      rep: ["Push the rope down until your arms are straight, spreading the ends apart at the bottom.", "Squeeze the backs of your arms.", "Let it rise slowly until your forearms are just above parallel."],
      feel: ["Triceps (back of the arms).", "Shoulders or chest: your elbows are moving."],
      cues: ["Elbows stay pinned.", "Split the rope at the bottom.", "Only your forearms move."],
      mistakes: [
        ["Elbows moving", "Elbows lifting forward turns it into a shoulder exercise.", "Elbows fixed at your sides; lighter weight.", { A: { aN: 45, aF: 45 }, ring: "eN" }],
        ["Leaning over", "Bending over the rope uses body weight to push it down.", "Small lean only; stand tall.", { B: { t: 148 } }]]
    },
    "oh-ext": {
      view: "side", base: { px: 170, py: 158 }, A: { aN: 175, eN: -15, aF: 175, eF: -15 }, B: { aN: 175, eN: 178, aF: 175, eF: 178 },
      eq: [{ db: "hN", front: true }],
      setup: ["Hold one dumbbell (or a rope on the low pulley facing away) with both hands overhead.", "Ribs down, core braced.", "Elbows pointing forward, close to your head."],
      rep: ["Lower the weight behind your head by bending only at the elbows.", "Stop when you feel a good stretch in the back of your arms.", "Straighten your arms back up."],
      feel: ["Triceps, especially the long head (inner back of the arm).", "Lower back (you're arching) or a pinch in the shoulder."],
      cues: ["Elbows stay pointing forward.", "Ribs down.", "Stretch, then squeeze."],
      mistakes: [
        ["Arching the back", "Leaning back to get the weight overhead loads the lower back.", "Brace your core; lighter weight.", { A: { t: 192 }, B: { t: 192 }, ring: "pel" }],
        ["Elbows flaring out", "Elbows splaying wide shifts the load to the shoulders.", "Keep them pointing forward, near your head."]],
      shoulder: "If overhead positions bother your left shoulder, swap to the rope pushdown or do this one on a cable facing away with a smaller range. " + SH
    }
  };
  window.SL_FORM["lying-curl"] = { ...window.SL_FORM["seated-curl"], setup: ["Lying or seated: whichever machine is free.", ...window.SL_FORM["seated-curl"].setup] };
})();

/* Library exercise guides (v10.2). Text only: setup, the rep, where to feel it, focus points, common mistakes.
   tempo overrides the default "1 s up, a short squeeze, 2 s down" line for holds, jumps and swings. */
(function () {
  const HOLD = "Breathe steadily the whole time. Stop the set when your form slips, not when the clock says.";
  const FAST = "Move quickly but under control. Stop the set when the reps get sloppy.";
  Object.assign(window.SL_FORM, {
    "pushups": {
      setup: ["Hands just wider than your shoulders, fingers forward.", "Body in a straight line from head to heels, glutes and core tight.", "Too hard? Hands on a bench or the knees down, same straight line."],
      rep: ["Lower your chest to just above the floor, elbows about 45° from your body.", "Push the floor away until your arms are straight.", "Keep your hips level with your shoulders the whole way."],
      feel: ["Chest, front of the shoulders and triceps, with your core working to hold the line.", "Lower back. If it aches your hips are sagging."],
      cues: ["Plank that moves.", "Chest to the floor, not the chin.", "Elbows back at 45°, not out wide."],
      mistakes: [["Hips sagging", "The lower back dips and takes the load instead of the chest.", "Squeeze glutes and brace; drop to the knees or an incline if needed."], ["Elbows flared out", "Elbows straight out to the sides strain the front of the shoulder.", "Tuck them to about 45°."], ["Half reps", "Bobbing at the top skips the part that builds strength.", "Chest to just above the floor every rep."]]
    },
    "diamond-pushups": {
      setup: ["Hands together under your chest, thumbs and index fingers touching to make a diamond.", "Body straight from head to heels.", "Knees down is fine while you build up to it."],
      rep: ["Lower your chest toward your hands, elbows tracking back along your sides.", "Touch or nearly touch your hands with your chest.", "Press back up to straight arms."],
      feel: ["Triceps first, then inner chest.", "Wrists. If they hurt, widen the hands slightly."],
      cues: ["Elbows brush your ribs.", "Chest to hands.", "Body stays rigid."],
      mistakes: [["Elbows flaring", "Elbows swinging out turns it into a sloppy wide push-up.", "Keep them tucked and pointing back."], ["Hips piking up", "Bum in the air shortens the range.", "Squeeze glutes so your body stays in one line."]]
    },
    "pullups-bw": {
      setup: ["Overhand grip just wider than shoulders (pull-up) or underhand at shoulder width (chin-up).", "Hang with straight arms, shoulders pulled slightly down away from your ears.", "Legs still, ankles crossed if it helps."],
      rep: ["Pull your elbows down toward your ribs until your chin clears the bar.", "Pause briefly at the top.", "Lower all the way to straight arms over 2 seconds."],
      feel: ["Lats (sides of the back) and biceps.", "Neck and upper traps. If you feel it there you're shrugging."],
      cues: ["Shoulders down first, then pull.", "Elbows to your back pockets.", "Chest to the bar."],
      mistakes: [["Kipping and swinging", "Using leg swing for momentum skips the work and jars the shoulders.", "Keep the body still; use the assisted machine or a band until you can."], ["Half reps", "Not reaching straight arms at the bottom halves the range.", "Full hang between every rep."]]
    },
    "dips": {
      setup: ["Hands on the bars, arms straight, shoulders pressed down away from your ears.", "Lean slightly forward for more chest, stay upright for more triceps.", "Knees bent, ankles crossed."],
      rep: ["Lower until your upper arms are about level with the floor.", "Press back up to straight arms.", "Keep your shoulders down the whole time."],
      feel: ["Triceps, lower chest and front of the shoulders.", "A pinch in the front of the shoulder. If so, don't go as deep."],
      cues: ["Shoulders away from your ears.", "Elbows back, not out.", "Only as deep as feels good."],
      mistakes: [["Going too deep", "Sinking far below parallel stresses the front of the shoulder.", "Stop when your upper arms are level with the floor."], ["Shrugging", "Shoulders creeping up to your ears takes the load off the triceps.", "Push the bars down and keep a long neck."]]
    },
    "situps": {
      setup: ["Lie on your back, knees bent, feet flat (anchored under something if needed).", "Hands lightly at your temples or crossed on your chest.", "Lower back gently pressed into the floor."],
      rep: ["Curl up one vertebra at a time until your chest is near your thighs.", "Lower back down with control, don't flop.", "Exhale on the way up."],
      feel: ["Abs, with some hip flexors at the top.", "Neck. If it strains, cross your arms instead of holding your head."],
      cues: ["Curl, don't jerk.", "Chin tucked a fist from your chest.", "Slow on the way down."],
      mistakes: [["Pulling on the neck", "Yanking your head forward strains the neck and does nothing for the abs.", "Hands light at the temples or arms crossed."], ["Using momentum", "Throwing yourself up turns it into a hip flexor swing.", "Slow, controlled curl."]]
    },
    "crunches": {
      setup: ["Lie on your back, knees bent, feet flat.", "Hands lightly at your temples or across your chest.", "Chin slightly tucked."],
      rep: ["Curl your shoulders off the floor by squeezing your ribs toward your hips.", "Pause and squeeze at the top.", "Lower slowly until your shoulders touch down."],
      feel: ["Upper abs.", "Neck or hip flexors."],
      cues: ["Ribs to hips.", "Short range, hard squeeze.", "Breathe out as you curl."],
      mistakes: [["Pulling the head", "Hands dragging the head forward strains the neck.", "Hands barely touch your head, or cross your arms."], ["Going too fast", "Bouncing reps use momentum, not abs.", "One second up, squeeze, two seconds down."]]
    },
    "leg-raises": {
      setup: ["Lie flat, hands under your lower back or by your sides.", "Legs straight or slightly bent.", "Press your lower back into the floor (or your hands)."],
      rep: ["Lift your legs until they're vertical.", "Lower slowly until just above the floor.", "Stop lower if your back starts to arch."],
      feel: ["Lower abs.", "Lower back. If it arches off the floor, bend your knees or shorten the range."],
      cues: ["Back stays flat.", "Lower slowly.", "Knees bent is fine."],
      mistakes: [["Lower back arching", "When the legs get low the back peels off the floor and takes the load.", "Bend your knees and only go as low as your back stays down."], ["Dropping the legs", "Letting them fall wastes the hardest part.", "Two to three seconds on the way down."]]
    },
    "superman": {
      setup: ["Lie face down, arms straight out in front, legs straight.", "Forehead down, looking at the floor.", "Glutes lightly squeezed."],
      rep: ["Lift your arms, chest and legs a few centimetres off the floor at the same time.", "Hold for one to two seconds.", "Lower with control."],
      feel: ["Lower back, glutes and upper back.", "Neck. Keep looking at the floor."],
      cues: ["Long, not high.", "Squeeze glutes.", "Look down."],
      mistakes: [["Cranking the neck up", "Looking forward bends the neck back.", "Keep your gaze on the floor just ahead of you."], ["Lifting too high", "Overarching pinches the lower back.", "A few centimetres is enough; reach long instead."]]
    },
    "burpees": {
      tempo: FAST,
      setup: ["Stand with feet shoulder width apart.", "Clear space in front of you.", "Low-impact option: step back and forward instead of jumping."],
      rep: ["Squat down and put your hands on the floor.", "Jump or step your feet back to a plank, then do a push-up (optional).", "Jump or step your feet back to your hands, stand and jump up with arms overhead."],
      feel: ["Whole body, mostly legs, chest and heart rate.", "Lower back. If it sags in the plank, step back instead of jumping."],
      cues: ["Strong plank in the middle.", "Land softly.", "Steady pace over speed."],
      mistakes: [["Sagging plank", "Landing the plank with the hips dropped jars the lower back.", "Land with core braced, or step back."], ["Landing heavy", "Stiff landings pound the knees.", "Land quietly with soft knees."]]
    },
    "mountain-climbers": {
      tempo: FAST,
      setup: ["High plank: hands under shoulders, body straight.", "Core tight.", "Weight over your hands."],
      rep: ["Drive one knee toward your chest.", "Switch legs, bringing the other knee in as the first goes back.", "Keep a steady rhythm."],
      feel: ["Abs, shoulders and hip flexors, with heart rate up.", "Wrists or lower back."],
      cues: ["Hips level with shoulders.", "Knees to chest.", "Shoulders over hands."],
      mistakes: [["Hips piking up", "Bum high makes it easier and loses the core work.", "Keep a flat plank line."], ["Bouncing hips", "Hips bobbing up and down with each switch.", "Brace and move only the legs."]]
    },
    "plank": {
      tempo: HOLD,
      setup: ["Forearms on the floor, elbows under shoulders.", "Legs straight, toes tucked.", "Body in a straight line from head to heels."],
      rep: ["Squeeze glutes and brace your abs as if about to be poked.", "Push the floor away with your forearms.", "Hold, breathing steadily."],
      feel: ["Abs and the whole front of your body.", "Lower back. If you feel it there, your hips are sagging."],
      cues: ["Glutes tight.", "Ribs down.", "Breathe."],
      mistakes: [["Hips sagging", "The lower back takes the strain.", "Squeeze glutes, tuck the pelvis slightly."], ["Hips too high", "A tent shape takes the work out of the abs.", "Lower until you're in one line."], ["Holding your breath", "Straining with no breath makes it harder and raises blood pressure.", "Slow breaths through the hold."]]
    },
    "side-plank": {
      tempo: HOLD,
      setup: ["Lie on your side, elbow under your shoulder.", "Legs straight and stacked, or the bottom knee down for an easier version.", "Top hand on your hip."],
      rep: ["Lift your hips until your body is in a straight line.", "Hold, keeping hips high.", "Swap sides and match the time."],
      feel: ["Side of the abs (obliques) and the side of the hip.", "The shoulder you're leaning on. Keep it pushed away from the floor."],
      cues: ["Hips high.", "Shoulder over elbow.", "Long body."],
      mistakes: [["Hips dropping", "Hips sinking toward the floor turns it into resting.", "Push the hip up; drop to the knee if needed."], ["Rolling forward", "The chest turns down to the floor.", "Stack shoulders and hips, face forward."]]
    },
    "bw-squat": {
      setup: ["Feet shoulder width apart, toes slightly out.", "Arms out in front for balance.", "Chest up."],
      rep: ["Sit your hips back and down until your thighs are about parallel to the floor.", "Knees follow your toes.", "Push through your whole foot to stand up."],
      feel: ["Quads and glutes.", "Knees. If they hurt, sit back more."],
      cues: ["Sit back and down.", "Knees out over toes.", "Heels down."],
      mistakes: [["Knees caving in", "Knees falling inward strains them.", "Push the knees out in line with your toes."], ["Heels lifting", "Weight on the toes loads the knees.", "Keep the whole foot planted; sit back more."]]
    },
    "jump-squats": {
      tempo: FAST,
      setup: ["Feet shoulder width apart.", "Arms ready to swing.", "Soft knees."],
      rep: ["Squat down to about half depth.", "Jump up explosively, swinging your arms.", "Land softly and go straight into the next squat."],
      feel: ["Quads, glutes and calves, with heart rate up.", "Knees or shins. Land softer or switch to normal squats."],
      cues: ["Land quiet.", "Knees out.", "Explode up."],
      mistakes: [["Stiff landings", "Landing on straight legs jars the knees.", "Land on the balls of your feet, sinking into the next squat."], ["Knees caving on landing", "Knees collapsing inward under load.", "Push them out over your toes."]]
    },
    "lunges": {
      setup: ["Stand tall, feet hip width apart.", "Hands on hips or by your sides.", "Leave room in front (forward lunge) or behind (reverse lunge)."],
      rep: ["Step forward (or back) into a long stride.", "Lower until both knees are bent to about 90°, back knee just above the floor.", "Push through the front heel to step back to standing. Alternate legs."],
      feel: ["Front leg quads and glutes.", "Front knee. If it hurts, take a longer step or switch to reverse lunges."],
      cues: ["Straight down, not forward.", "Front knee over the ankle.", "Tall chest."],
      mistakes: [["Short step", "A short stride shoves the front knee far past the toes.", "Longer step so the shin stays more upright."], ["Wobbling", "Feet in a line like a tightrope.", "Keep feet hip width apart, like train tracks."]]
    },
    "step-ups": {
      setup: ["Box or bench about knee height.", "Whole foot on the box.", "Stand tall, core braced."],
      rep: ["Push through the heel on the box to stand up on it.", "Bring the other foot up or just tap it.", "Step down slowly with the same leg and repeat, then swap."],
      feel: ["Glutes and quads of the leg on the box.", "Lower back or the trailing leg doing the work."],
      cues: ["Drive through the top heel.", "Don't push off the floor.", "Step down slow."],
      mistakes: [["Pushing off the bottom foot", "Bouncing from the floor leg takes over.", "Keep the floor foot light; let the top leg lift you."], ["Knee caving", "Top knee falling in.", "Keep it over your toes."]]
    },
    "glute-bridge": {
      setup: ["Lie on your back, knees bent, feet flat about hip width apart.", "Heels a hand's length from your bum.", "Arms by your sides."],
      rep: ["Push through your heels to lift your hips until knees, hips and shoulders are in a line.", "Squeeze your glutes hard for a second.", "Lower slowly."],
      feel: ["Glutes, with some hamstrings.", "Lower back. If so, tuck your ribs down and don't lift as high."],
      cues: ["Heels down.", "Squeeze at the top.", "Ribs down, no arch."],
      mistakes: [["Over-arching", "Pushing the hips too high bends the lower back instead of using the glutes.", "Stop at a straight line; tuck the pelvis."], ["Feet too far away", "Hamstrings cramp and take over.", "Bring the heels closer to your bum."]]
    },
    "wall-sit": {
      tempo: HOLD,
      setup: ["Back flat against a wall.", "Walk your feet out and slide down until your thighs are parallel to the floor.", "Knees over your ankles, not past your toes."],
      rep: ["Hold the position with your back pressed into the wall.", "Hands off your legs.", "Breathe steadily."],
      feel: ["Quads, burning.", "Knee joint pain. Slide up a little higher."],
      cues: ["Back flat.", "Knees over ankles.", "Hands off the thighs."],
      mistakes: [["Hands on the thighs", "Pushing on your legs takes the load off.", "Arms crossed or by your sides."], ["Feet too close", "Knees shoot past the toes and get sore.", "Walk the feet out so shins are vertical."]]
    },
    "box-jumps": {
      tempo: FAST,
      setup: ["Stand about a foot from a stable box. Start low.", "Feet hip width apart.", "Arms back, ready to swing."],
      rep: ["Swing your arms and jump up, landing softly with your whole foot on the box.", "Stand up fully on top.", "Step down, don't jump down, then reset."],
      feel: ["Glutes, quads and calves.", "Knees or Achilles on landing. Lower the box."],
      cues: ["Land soft and quiet.", "Stand tall on top.", "Step down."],
      mistakes: [["Box too high", "Landing in a deep squat or catching your shins.", "Pick a height you land on in a half squat."], ["Jumping down", "Rebounding off the floor hammers the Achilles.", "Step down each rep."]]
    },
    "jumping-jacks": {
      tempo: FAST,
      setup: ["Stand tall, feet together, arms by your sides.", "Soft knees.", "Light on the balls of your feet."],
      rep: ["Jump your feet out wide while swinging your arms overhead.", "Jump back to feet together, arms down.", "Keep a steady rhythm."],
      feel: ["Calves, shoulders and heart rate.", "Shins or knees. Try a step-out version."],
      cues: ["Light feet.", "Full arm swing.", "Steady rhythm."],
      mistakes: [["Landing flat-footed", "Heavy landings jar the shins.", "Stay on the balls of your feet."], ["Half arm swings", "Arms only to shoulder height loses the point.", "Hands meet overhead."]]
    },
    "bench-press": {
      setup: ["Lie with your eyes under the bar, feet flat on the floor.", "Grip just wider than shoulder width.", "Pull your shoulder blades back and down into the bench, slight arch in the upper back."],
      rep: ["Unrack and hold the bar over your shoulders.", "Lower to your lower chest over 2 seconds, elbows about 45° from your body.", "Press back up and slightly back toward your face."],
      feel: ["Chest, front of the shoulders and triceps.", "Front of the shoulder joint. Tuck the elbows more and use a lighter weight."],
      cues: ["Shoulder blades pinned.", "Bar to lower chest.", "Feet drive into the floor."],
      mistakes: [["Elbows flared", "Elbows at 90° from the body strain the shoulders.", "Tuck to about 45°."], ["Bouncing off the chest", "Using the rebound skips the hardest part and risks the ribs.", "Touch lightly, then press."], ["Shoulders rolling forward", "Losing the shoulder-blade set at the top.", "Keep them pinned all set."]]
    },
    "db-bench": {
      setup: ["Sit on the bench with the dumbbells on your thighs, then lie back and kick them up.", "Feet flat, shoulder blades back and down.", "Dumbbells over your chest, palms facing your feet or slightly in."],
      rep: ["Lower the dumbbells to the sides of your chest, elbows about 45°.", "Feel a stretch across your chest.", "Press up, bringing them close but not clanking."],
      feel: ["Chest, front shoulders and triceps.", "Front of the shoulder. Shorten the range."],
      cues: ["Shoulders pinned.", "Elbows at 45°.", "Control the stretch."],
      mistakes: [["Dropping too deep", "Elbows far below the bench overstretch the shoulder.", "Stop when the dumbbells reach chest level."], ["Elbows flared", "Arms straight out to the sides.", "Tuck to 45°."]]
    },
    "ohp": {
      setup: ["Bar on the front of your shoulders, grip just outside shoulder width.", "Feet hip width apart, glutes and abs tight.", "Elbows slightly in front of the bar."],
      rep: ["Press the bar straight up, moving your head back slightly to let it pass.", "Push your head through once the bar is past your face, arms locked overhead.", "Lower back to your shoulders with control."],
      feel: ["Shoulders and triceps, with core working to stay upright.", "Lower back. You're leaning back too far."],
      cues: ["Squeeze glutes.", "Bar in a straight line.", "Head through at the top."],
      mistakes: [["Leaning back", "Turning it into a standing incline press loads the lower back.", "Glutes and abs tight; lighter weight."], ["Bar drifting forward", "Pressing out in front makes it heavier and strains the shoulders.", "Bar travels close to your face."]]
    },
    "db-shoulder": {
      setup: ["Sit on an upright bench, back against the pad.", "Dumbbells at shoulder height, palms forward or slightly in.", "Feet flat, core braced."],
      rep: ["Press the dumbbells up until your arms are nearly straight.", "Bring them close together at the top.", "Lower slowly to ear level."],
      feel: ["Shoulders and triceps.", "Neck or upper traps. Keep shoulders down."],
      cues: ["Back against the pad.", "Elbows slightly forward.", "Lower to ear level."],
      mistakes: [["Arching off the pad", "The lower back lifts and takes the strain.", "Brace and keep your back flat."], ["Partial reps", "Barely lowering the weight.", "Down to ear level every rep."]]
    },
    "bb-row": {
      setup: ["Feet hip width, grip just outside your knees.", "Hinge at the hips until your torso is about 45° or lower, back flat.", "Let the bar hang at arm's length."],
      rep: ["Pull the bar to your lower ribs, elbows going back.", "Squeeze your shoulder blades together.", "Lower with control to straight arms."],
      feel: ["Upper and mid back, lats and rear shoulders.", "Lower back. If it rounds, lighten up."],
      cues: ["Flat back.", "Elbows back, not out.", "Torso stays still."],
      mistakes: [["Standing up as you pull", "Heaving with the hips turns it into a shrug.", "Keep the torso angle fixed."], ["Rounded back", "The lower back takes the load.", "Chest up, hips back; lighter weight."]]
    },
    "db-row": {
      setup: ["One hand and knee on a bench, other foot on the floor.", "Back flat, roughly parallel to the floor.", "Dumbbell hanging under your shoulder."],
      rep: ["Pull the dumbbell toward your hip, elbow close to your body.", "Squeeze your shoulder blade back at the top.", "Lower until your arm is straight and you feel a stretch."],
      feel: ["Lats and mid back on the working side.", "Biceps doing most of it, or the lower back twisting."],
      cues: ["Elbow to hip.", "Shoulders square to the floor.", "Full stretch at the bottom."],
      mistakes: [["Twisting the torso", "Rotating to heave the weight up.", "Keep both shoulders level; lighter weight."], ["Pulling to the chest", "Elbow flares out and the upper traps take over.", "Pull toward your hip."]]
    },
    "db-curl": {
      setup: ["Stand tall, a dumbbell in each hand, palms forward.", "Elbows by your sides.", "Shoulders back."],
      rep: ["Curl the dumbbells up by bending only at the elbows.", "Squeeze at the top.", "Lower slowly all the way to straight arms."],
      feel: ["Biceps.", "Front of the shoulders or lower back. You're swinging."],
      cues: ["Elbows pinned.", "No swinging.", "All the way down."],
      mistakes: [["Swinging", "Rocking the body to lift the weight.", "Stand against a wall or go lighter."], ["Elbows drifting forward", "Front shoulders take over.", "Keep elbows by your sides."]]
    },
    "hammer-curl": {
      setup: ["Stand tall, dumbbells by your sides, palms facing your body.", "Elbows tucked.", "Shoulders back."],
      rep: ["Curl the dumbbells up keeping palms facing each other.", "Squeeze at the top.", "Lower slowly to straight arms."],
      feel: ["Biceps and the top of the forearm (brachialis).", "Wrists or lower back."],
      cues: ["Thumbs up.", "Elbows still.", "Slow down."],
      mistakes: [["Swinging", "Using hips and back to lift.", "Lighter weight, strict reps."], ["Elbows flaring", "Elbows leave your sides.", "Keep them tucked."]]
    },
    "skullcrusher": {
      setup: ["Lie on a flat bench holding an EZ bar or dumbbells over your shoulders, arms straight.", "Grip about shoulder width.", "Feet flat."],
      rep: ["Bend at the elbows to lower the weight toward your forehead or just behind your head.", "Keep your upper arms still and pointing up.", "Straighten your arms back to the start."],
      feel: ["Triceps.", "Elbow joint pain. Lighten up or lower to behind the head."],
      cues: ["Only the elbows move.", "Elbows point to the ceiling.", "Control the bottom."],
      mistakes: [["Elbows flaring out", "Elbows splaying wide.", "Keep them shoulder width."], ["Moving the upper arm", "Turning it into a pullover takes load off the triceps.", "Upper arms stay still."]]
    },
    "db-fly": {
      setup: ["Lie on a flat bench, dumbbells over your chest, palms facing each other.", "Slight bend in the elbows and keep it fixed.", "Shoulder blades back and down."],
      rep: ["Open your arms wide in an arc until you feel a stretch across your chest.", "Stop when the dumbbells are about level with the bench.", "Squeeze them back up along the same arc."],
      feel: ["Chest, especially the stretch at the bottom.", "Front of the shoulder or the biceps tendon. Don't go as deep."],
      cues: ["Hug a tree.", "Fixed elbow bend.", "Stretch, don't strain."],
      mistakes: [["Going too deep", "Dropping the arms below the bench strains the shoulder.", "Stop at bench level."], ["Bending the elbows more", "Turning it into a press.", "Keep the same slight bend all rep."]]
    },
    "db-lat-raise": {
      setup: ["Stand tall, dumbbells by your sides.", "Slight bend in the elbows.", "Lean very slightly forward."],
      rep: ["Raise your arms out to the sides until they're level with your shoulders.", "Lead with the elbows, thumbs neutral or slightly down.", "Lower slowly over 2 seconds."],
      feel: ["Outside of the shoulder (side delts).", "Upper traps or neck. Go lighter and stop at shoulder height."],
      cues: ["Elbows lead.", "Shoulder height, no higher.", "Shoulders down."],
      mistakes: [["Shrugging", "Traps take over as the weight goes up.", "Push shoulders down; lighter weight."], ["Swinging", "Using the hips to throw the weights up.", "Strict reps, slow down."]]
    },
    "shrugs": {
      setup: ["Stand tall with a barbell or dumbbells at arm's length.", "Arms straight.", "Look straight ahead."],
      rep: ["Lift your shoulders straight up toward your ears.", "Hold for a second at the top.", "Lower slowly to a full stretch."],
      feel: ["Upper traps.", "Neck strain. Keep your chin neutral."],
      cues: ["Straight up, straight down.", "Pause at the top.", "Arms stay straight."],
      mistakes: [["Rolling the shoulders", "Circling adds nothing and strains the joint.", "Straight up and down."], ["Bending the arms", "Turning it into a curl.", "Arms stay straight."]]
    },
    "squat": {
      setup: ["Bar on your upper back, not your neck. Hands just outside shoulders.", "Feet shoulder width, toes slightly out.", "Big breath and brace your core before each rep."],
      rep: ["Sit your hips back and down, knees tracking over your toes.", "Go to at least parallel if you can keep your back neutral.", "Drive up through your whole foot, hips and chest rising together."],
      feel: ["Quads, glutes and core.", "Lower back or knees. Lighter weight, check depth and knee path."],
      cues: ["Brace before you go.", "Knees out.", "Chest up."],
      mistakes: [["Knees caving in", "Knees collapsing inward on the way up.", "Push them out over your toes."], ["Hips shooting up first", "Turning it into a good morning loads the back.", "Chest and hips rise together; lighter weight."], ["Heels lifting", "Weight drifts to the toes.", "Whole foot planted, sit back more."]]
    },
    "goblet-squat": {
      setup: ["Hold a dumbbell or kettlebell vertically at your chest.", "Feet shoulder width, toes slightly out.", "Elbows tucked under the weight."],
      rep: ["Squat down between your knees, keeping your chest tall.", "Elbows go inside your knees at the bottom.", "Drive up through your whole foot."],
      feel: ["Quads and glutes.", "Lower back or wrists."],
      cues: ["Chest proud.", "Elbows inside knees.", "Sit between your heels."],
      mistakes: [["Leaning forward", "The weight pulls you over.", "Hold it tight to your chest."], ["Knees caving", "Knees fall inward.", "Push them out with your elbows at the bottom."]]
    },
    "deadlift": {
      setup: ["Bar over the middle of your feet, feet hip width.", "Hinge down and grip just outside your legs, shins touching the bar.", "Chest up, back flat, shoulders over the bar. Pull the slack out."],
      rep: ["Push the floor away and stand up, keeping the bar against your legs.", "Hips and shoulders rise together.", "Stand tall and squeeze glutes, then hinge back down the same way."],
      feel: ["Glutes, hamstrings and the whole back.", "Lower back rounding or a sharp pain. Stop and lighten."],
      cues: ["Push the floor away.", "Bar stays close.", "Flat back."],
      mistakes: [["Rounded back", "The lower back takes the load.", "Chest up, brace hard, lighter weight."], ["Bar drifting away", "Bar swings out in front, making it heavier on the back.", "Drag it up your shins and thighs."], ["Leaning back at the top", "Over-arching at lockout.", "Stand tall and squeeze the glutes, no lean."]]
    },
    "rdl": {
      setup: ["Stand tall holding a barbell or dumbbells in front of your thighs.", "Feet hip width, soft knees.", "Shoulders back."],
      rep: ["Push your hips back, sliding the weight down your thighs.", "Stop when you feel a strong hamstring stretch, usually around mid-shin.", "Drive your hips forward to stand up."],
      feel: ["Hamstrings and glutes.", "Lower back. Don't go as low and keep the back flat."],
      cues: ["Hips back, not down.", "Weight close to your legs.", "Flat back."],
      mistakes: [["Squatting it", "Bending the knees a lot turns it into a squat.", "Keep a soft, fixed knee bend; hips go back."], ["Rounding to go lower", "Chasing depth rounds the lower back.", "Stop where your hamstrings stop you."]]
    },
    "db-lunge": {
      setup: ["Stand tall, a dumbbell in each hand at your sides.", "Feet hip width.", "Core braced."],
      rep: ["Step forward (or back) into a long stride.", "Lower until your back knee is just above the floor.", "Push through the front heel to return. Alternate legs."],
      feel: ["Glutes and quads of the front leg.", "Front knee. Longer step or reverse lunge."],
      cues: ["Tall chest.", "Straight down.", "Front heel drives."],
      mistakes: [["Leaning forward", "Dumbbells pull your chest over.", "Stand tall, lighter weight."], ["Narrow stance", "Feet in a line makes you wobble.", "Feet stay hip width apart."]]
    },
    "bb-hip-thrust": {
      setup: ["Upper back against a bench, bar across your hips (use a pad).", "Feet flat, about hip width, so your shins are vertical at the top.", "Chin tucked, looking forward."],
      rep: ["Drive through your heels to lift the bar until your hips are level with your knees and shoulders.", "Squeeze your glutes hard for a second.", "Lower with control."],
      feel: ["Glutes.", "Lower back or hamstrings cramping."],
      cues: ["Chin tucked.", "Ribs down.", "Squeeze at the top."],
      mistakes: [["Arching the back", "Over-extending at the top uses the lower back.", "Ribs down; stop at a flat line."], ["Feet in the wrong spot", "Too far out: hamstrings. Too close: quads.", "Shins vertical at the top."]]
    },
    "kb-swing": {
      tempo: "Powerful hip snap, let the bell float, then hinge back. Stop when the hinge gets sloppy.",
      setup: ["Kettlebell a step in front of you, feet just wider than shoulders.", "Hinge and grip the handle with both hands, back flat.", "Hike it back between your legs to start."],
      rep: ["Snap your hips forward to swing the bell up to chest height.", "Arms just guide it; the hips do the work.", "Let it fall back between your legs as you hinge, then repeat."],
      feel: ["Glutes and hamstrings, with core and grip.", "Lower back or shoulders lifting it."],
      cues: ["Hinge, don't squat.", "Snap the hips.", "Arms are ropes."],
      mistakes: [["Squatting the swing", "Bending the knees a lot loses the hip drive.", "Hips go back, shins stay fairly upright."], ["Lifting with the arms", "Shoulders raise the bell.", "Let the hips throw it."], ["Rounded back", "Spine flexes at the bottom.", "Keep the back flat; hike it higher between the legs."]]
    },
    "pec-deck": {
      setup: ["Seat height so the handles line up with the middle of your chest.", "Back flat on the pad.", "Slight bend in the elbows."],
      rep: ["Bring the handles together in front of your chest in a wide arc.", "Squeeze your chest for a second.", "Open back slowly until you feel a stretch."],
      feel: ["Chest.", "Front of the shoulder. Don't let the arms go too far back."],
      cues: ["Hug a tree.", "Back on the pad.", "Slow stretch."],
      mistakes: [["Going too far back", "Over-stretching strains the shoulder.", "Stop when your hands are level with your chest."], ["Shoulders rolling forward", "Shoulders lift off the pad.", "Keep them pinned back."]]
    },
    "cable-fly": {
      setup: ["Pulleys at about shoulder height, a handle in each hand.", "Step forward into a split stance, slight lean.", "Slight bend in the elbows."],
      rep: ["Bring your hands together in front of your chest in a wide arc.", "Squeeze for a second.", "Open slowly until you feel a stretch."],
      feel: ["Chest.", "Shoulders or biceps. Keep the elbow bend fixed."],
      cues: ["Arc, don't press.", "Fixed elbows.", "Squeeze in the middle."],
      mistakes: [["Pressing", "Bending the elbows more turns it into a press.", "Same slight bend all set."], ["Going too wide", "Letting the cables pull your arms back.", "Stop at the stretch."]]
    },
    "face-pull": {
      setup: ["Pulley at about face height with a rope.", "Grip the rope ends, thumbs pointing back.", "Step back so the stack lifts, stand tall."],
      rep: ["Pull the rope toward your face, splitting the ends apart.", "Finish with hands beside your ears and elbows high.", "Return slowly."],
      feel: ["Rear shoulders and upper back.", "Lower back. Stand taller, lighter weight."],
      cues: ["Elbows high.", "Pull apart.", "Squeeze shoulder blades."],
      mistakes: [["Leaning back", "Using body weight to pull.", "Stand tall; lighter weight."], ["Elbows dropping", "Turns it into a row.", "Elbows stay at shoulder height."]]
    },
    "preacher-curl": {
      setup: ["Seat height so your armpits sit snug at the top of the pad.", "Backs of your arms flat on the pad.", "Grip the handles, arms nearly straight."],
      rep: ["Curl the handles up toward your shoulders.", "Squeeze at the top.", "Lower slowly to almost straight arms."],
      feel: ["Biceps.", "Elbow joint at the bottom. Don't lock out hard."],
      cues: ["Arms glued to the pad.", "Slow down.", "No hard lockout."],
      mistakes: [["Lifting off the pad", "Elbows rise and the shoulders help.", "Keep the backs of your arms down."], ["Dropping the weight", "Letting it fall at the bottom strains the elbow.", "Two seconds down."]]
    },
    "dip-machine": {
      setup: ["Seat height so the handles are at about your lower ribs.", "Back against the pad if there is one.", "Grip the handles, elbows bent."],
      rep: ["Push the handles down until your arms are straight.", "Squeeze your triceps.", "Let them rise slowly back to the start."],
      feel: ["Triceps and lower chest.", "Front of the shoulder. Don't let the handles come up too high."],
      cues: ["Shoulders down.", "Elbows back.", "Full lockout."],
      mistakes: [["Shrugging", "Shoulders rise to your ears.", "Keep them down and back."], ["Too much range", "Handles coming up past your armpits.", "Stop at your lower ribs."]]
    },
    "smith-bench": {
      setup: ["Bench positioned so the bar lowers to your lower chest.", "Grip just wider than shoulder width.", "Shoulder blades back and down, feet flat."],
      rep: ["Unhook the bar and lower it to your lower chest.", "Press back up to straight arms.", "Re-hook by rotating your wrists at the end."],
      feel: ["Chest, front of the shoulders and triceps.", "Front of the shoulder. Check bench position and tuck elbows."],
      cues: ["Bar to lower chest.", "Elbows at 45°.", "Shoulders pinned."],
      mistakes: [["Bench in the wrong spot", "The bar lands on your neck or belly.", "Set it so the bar meets your lower chest."], ["Elbows flared", "Arms straight out to the sides.", "Tuck to 45°."]]
    },
    "hack-squat": {
      setup: ["Back flat against the pad, shoulders under the pads.", "Feet shoulder width in the middle of the platform.", "Release the safety handles."],
      rep: ["Lower until your thighs are at least parallel to the platform.", "Keep your back on the pad and knees over toes.", "Push through your whole foot to stand up."],
      feel: ["Quads, with some glutes.", "Knees. Move your feet higher on the platform."],
      cues: ["Back on the pad.", "Knees out.", "Full depth."],
      mistakes: [["Half reps", "Stopping far above parallel.", "Lighten up and go deeper."], ["Heels lifting", "Weight on the toes loads the knees.", "Push through your heels, feet higher if needed."]]
    },
    "smith-squat": {
      setup: ["Bar on your upper back.", "Feet slightly in front of the bar, shoulder width.", "Brace your core, then unhook."],
      rep: ["Sit down until your thighs are about parallel.", "Knees track over your toes.", "Drive back up through your whole foot."],
      feel: ["Quads and glutes.", "Lower back or knees. Adjust foot position."],
      cues: ["Feet slightly forward.", "Sit down, not back.", "Brace."],
      mistakes: [["Feet directly under the bar", "Knees jam forward.", "Step the feet a little in front."], ["Knees caving", "Knees fall inward.", "Push them out over your toes."]]
    },
    "seated-calf": {
      setup: ["Knee pad snug on your lower thighs.", "Balls of your feet on the edge of the platform.", "Release the safety lever."],
      rep: ["Lower your heels as far as they'll go for a full stretch.", "Push up onto your toes as high as you can.", "Pause at the top, then lower slowly."],
      feel: ["Lower calves (soleus).", "Achilles pain. Shorten the stretch."],
      cues: ["Full stretch.", "Pause up top.", "No bouncing."],
      mistakes: [["Bouncing", "Bouncing off the bottom uses the tendon, not the muscle.", "Pause at the bottom."], ["Short range", "Small bounces at the top only.", "All the way down, all the way up."]]
    },
    "ab-machine": {
      setup: ["Seat height so the pads sit on your upper chest or handles by your head.", "Feet hooked in.", "Sit tall."],
      rep: ["Crunch forward by curling your ribs toward your hips.", "Squeeze your abs at the bottom.", "Return slowly."],
      feel: ["Abs.", "Hip flexors or arms doing the work."],
      cues: ["Ribs to hips.", "Curl, don't hinge.", "Slow back."],
      mistakes: [["Pulling with the arms", "Arms drag the weight.", "Arms just hold; abs curl."], ["Hinging at the hips", "Bending at the hips uses the hip flexors.", "Curl your spine instead."]]
    },
    "torso-rotation": {
      setup: ["Sit with the chest pad against you, legs locked in.", "Set the start angle to a comfortable range.", "Sit tall, hands on the handles."],
      rep: ["Rotate your torso against the resistance, keeping your hips still.", "Move slowly to the end of your comfortable range.", "Return slowly. Do both directions."],
      feel: ["Obliques (sides of your waist).", "Lower back. Reduce the range or the weight."],
      cues: ["Hips locked.", "Slow and controlled.", "Tall spine."],
      mistakes: [["Swinging", "Momentum twists the lower back.", "Slow down and go lighter."], ["Too much range", "Forcing the twist.", "Only as far as feels easy."]]
    }
  });
})();
