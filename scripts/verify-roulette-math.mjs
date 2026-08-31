/**
 * Independent Verification Script for FoodRoulette.tsx spinWheel() Math
 * 
 * Verifies that the rotation formula in spinWheel() lands the top pointer
 * exactly at the center of winningTargetIndex for any item count and consecutive spins.
 */

function runVerificationTest(itemCount = 8, iterations = 1000) {
  console.log(`\n==================================================`);
  console.log(`Running Verification for ${itemCount} items (${iterations} iterations)...`);
  console.log(`==================================================`);

  const sliceAngle = 360 / itemCount;
  let currentRotation = 0;
  let passCount = 0;
  const failures = [];

  for (let i = 0; i < iterations; i++) {
    const winningTargetIndex = Math.floor(Math.random() * itemCount);
    const extraFullTurns = 5;

    // --- EXACT FORMULA FROM FoodRoulette.tsx (lines 75-79) ---
    const targetOffset = 360 - winningTargetIndex * sliceAngle - sliceAngle / 2;
    const nextTargetAngle = 360 * extraFullTurns + targetOffset;

    const currentBase = Math.floor(currentRotation / 360) * 360;
    const finalRotation = currentBase + 360 * 2 + nextTargetAngle;
    // --------------------------------------------------------

    // Update rotation for the next consecutive spin (simulating multiple spins in a row)
    currentRotation = finalRotation;

    // Physical wheel verification:
    // With SVG transform "-rotate-90", slice 0 starts at 12 o'clock (0° from top).
    // Slices are laid out clockwise: slice i covers [i * sliceAngle, (i + 1) * sliceAngle).
    // When the wheel rotates clockwise by finalRotation degrees,
    // the static top pointer (0° at top) lands on wheel coordinate:
    const effectiveAngle = (360 - (finalRotation % 360) + 360) % 360;

    // Determine which slice is directly under the pointer
    const detectedSliceIndex = Math.floor(effectiveAngle / sliceAngle) % itemCount;

    // Expected center angle of the target slice
    const targetCenterAngle = winningTargetIndex * sliceAngle + sliceAngle / 2;
    const deltaFromCenter = Math.abs(effectiveAngle - targetCenterAngle);

    if (detectedSliceIndex === winningTargetIndex && deltaFromCenter < 1e-9) {
      passCount++;
    } else {
      failures.push({
        iteration: i + 1,
        winningTargetIndex,
        detectedSliceIndex,
        finalRotation,
        effectiveAngle,
        targetCenterAngle,
        deltaFromCenter,
      });
    }
  }

  console.log(`Result for ${itemCount} items: PASS ${passCount}/${iterations}`);
  if (failures.length > 0) {
    console.error(`FAILURES DETECTED (${failures.length}):`);
    console.error(JSON.stringify(failures.slice(0, 5), null, 2));
    return false;
  } else {
    console.log(`✓ Pointer lands EXACTLY at slice center (delta = 0.000000°) in 100% of cases.`);
    return true;
  }
}

// 1. Test standard 8-item wheel
const pass8 = runVerificationTest(8, 1000);

// 2. Test 6-item wheel (alternative category count)
const pass6 = runVerificationTest(6, 1000);

// 3. Test arbitrary counts (4, 5, 7, 10, 12)
const counts = [4, 5, 7, 10, 12];
let allPass = pass8 && pass6;
for (const c of counts) {
  const p = runVerificationTest(c, 500);
  allPass = allPass && p;
}

console.log(`\n==================================================`);
if (allPass) {
  console.log(`🎉 ALL TESTS PASSED: Mathematical proof confirmed for all slice counts and multi-spin sequences!`);
} else {
  console.error(`❌ SOME TESTS FAILED! Check failure reports above.`);
}
console.log(`==================================================\n`);
