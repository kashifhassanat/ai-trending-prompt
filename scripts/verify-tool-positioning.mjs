import assert from 'node:assert';

// Test that our built files or source files enforce the positioning rules
async function runTests() {
  console.log('--- Starting Tool Positioning & PSEO Uniqueness Verification ---');

  // 1. Verify Cannibalization Checker Tool-Swapping Duplicate Guardrail
  const { checkCannibalization } = await import('../lib/services/cannibalization-checker.ts');

  console.log('\n[Test 1] Tool-Swapping Duplicate Detection:');
  const toolSwapAttempt = checkCannibalization({
    title: '80s Retro Photo Prompts for Flux',
    primaryQuery: '80s retro photo prompts for flux',
    searchIntent: 'INSPIRATION'
  });

  console.log('Result for "80s Retro Photo Prompts for Flux":', {
    status: toolSwapAttempt.status,
    allowGeneration: toolSwapAttempt.allowGeneration,
    toolSwappingDuplicate: toolSwapAttempt.dimensions.toolSwappingDuplicate,
    reason: toolSwapAttempt.primaryMatch?.reason
  });

  assert.strictEqual(toolSwapAttempt.status, 'RED', 'Tool-swapping should return RED status');
  assert.strictEqual(toolSwapAttempt.allowGeneration, false, 'Tool-swapping should block automatic generation');
  assert.strictEqual(toolSwapAttempt.dimensions.toolSwappingDuplicate, true, 'toolSwappingDuplicate dimension should be true');

  console.log('\n[Test 2] Genuine Different Search Intent Approval:');
  const differentIntentAttempt = checkCannibalization({
    title: 'How to Calibrate Studio Strobe Lighting for Film Simulation',
    primaryQuery: 'how to calibrate studio strobe lighting',
    searchIntent: 'HOW_TO'
  });

  console.log('Result for differentiated intent:', {
    status: differentIntentAttempt.status,
    allowGeneration: differentIntentAttempt.allowGeneration
  });
  assert.strictEqual(differentIntentAttempt.allowGeneration, true, 'Distinct intent should allow generation');

  // 2. Verify AI Tool Registry Positioning
  const { AI_TOOLS_REGISTRY, getAIToolById } = await import('../lib/data/ai-tools-data.ts');

  console.log('\n[Test 3] Verifying AI Tool Compatibility Registry:');
  const gemini = getAIToolById('gemini');
  assert(gemini, 'Google Gemini must exist in registry');
  assert.strictEqual(gemini.category, 'GENERAL_PURPOSE', 'Google Gemini must be GENERAL_PURPOSE');

  const chatgpt = getAIToolById('chatgpt');
  assert(chatgpt, 'ChatGPT must exist in registry');
  assert.strictEqual(chatgpt.category, 'GENERAL_PURPOSE', 'ChatGPT must be GENERAL_PURPOSE');

  const googleFlow = getAIToolById('google-flow');
  assert(googleFlow, 'Google Flow must exist in registry');
  assert.strictEqual(googleFlow.category, 'VIDEO_GENERATION', 'Google Flow must be VIDEO_GENERATION');
  assert.strictEqual(googleFlow.status, 'FUTURE_PLANNED', 'Google Flow must be FUTURE_PLANNED');

  const deepseek = getAIToolById('deepseek');
  assert(deepseek, 'DeepSeek must exist in registry');
  assert.strictEqual(deepseek.category, 'REASONING_AND_CODE', 'DeepSeek must be REASONING_AND_CODE');
  assert.notStrictEqual(deepseek.category, 'IMAGE_GENERATION', 'DeepSeek must not be categorized as IMAGE_GENERATION');
  assert(deepseek.notes.toLowerCase().includes('not positioned as a primary image-generation tool'), 'DeepSeek notes must clarify it is not a primary image generator');

  // 3. Verify Prompt Model Compatibility Fields
  const { RETRO_80S_PROMPTS } = await import('../lib/data/prompts-data.ts');
  console.log('\n[Test 4] Verifying Prompt Compatibility Fields:');
  for (const p of RETRO_80S_PROMPTS) {
    assert(Array.isArray(p.recommendedTools), `Prompt #${p.number} must have recommendedTools`);
    assert(p.recommendedTools.includes('gemini'), `Prompt #${p.number} must recommend gemini`);
    assert(p.recommendedTools.includes('chatgpt'), `Prompt #${p.number} must recommend chatgpt`);
    assert(Array.isArray(p.compatibleTools), `Prompt #${p.number} must have compatibleTools`);
    assert(Array.isArray(p.toolSpecificNotes), `Prompt #${p.number} must have toolSpecificNotes`);
  }
  console.log(`Verified all ${RETRO_80S_PROMPTS.length} prompts have complete extensible tool compatibility metadata.`);

  console.log('\n✅ ALL VERIFICATION TESTS PASSED SUCCESSFULLY!');
}

runTests().catch(err => {
  console.error('❌ Verification failed:', err);
  process.exit(1);
});
