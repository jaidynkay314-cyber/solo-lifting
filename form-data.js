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
