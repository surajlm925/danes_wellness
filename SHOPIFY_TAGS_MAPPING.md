# Shopify Catalog Tagging Strategy

To effectively map quiz results to product SKUs in the frontend, apply the following `condition:*` tags to your products in the Shopify Admin. This ensures products surface when users have specific concerns.

## Tagging Checklist / Mapping

### Mental Health & Mood
- **`condition:anxiety`** -> Apply to products indicating: Anxiety, Panic Disorder, PTSD, Generalised Anxiety Disorder, Stress, Social Anxiety.
- **`condition:stress`** -> Apply to products indicating: Stress, Chronic Stress.
- **`condition:depression`** -> Apply to products indicating: Depression, Emotional Dysregulation.

### Sleep Disorders
- **`condition:sleep`** -> Apply to products indicating: Insomnia, Sleep Disorders, Sleep Difficulties, Nighttime Anxiety.

### Pain Management
- **`condition:chronic-pain`** -> Apply to products indicating: Chronic Pain, Severe Chronic Pain, Palliative Care.
- **`condition:nerve-pain`** -> Apply to products indicating: Neuropathic Pain, Nerve Disorders, Neuralgia, Sciatica.
- **`condition:muscle-pain`** -> Apply to products indicating: Muscle Pain, Body Aches, Muscle Spasms, Muscle Tension, Sports Injuries.
- **`condition:joint-pain`** -> Apply to products indicating: Joint Pain, Arthritis, Osteoarthritis, Rheumatoid Arthritis, Stiffness.
- **`condition:menstrual-pain`** -> Apply to products indicating: Dysmenorrhoea, Menstrual Cramps, Menstrual Pain.
- **`condition:headache`** -> Apply to products indicating: Migraine, Tension Headache, Sinus Headache.

### Digestion & Gut Health
- **`condition:digestion`** -> Apply to products indicating: Poor Digestion, Bloating, IBS, Constipation, Gas, Gut Health.
- **`condition:nausea`** -> Apply to products indicating: CINV (Chemotherapy-Induced Nausea and Vomiting), Nausea.

### Skin & Hair Health
- **`condition:skin`** -> Apply to products indicating: Dry Skin, Skin Inflammation, Eczema, Dermatitis, Sensitive Skin.
- **`condition:hair`** -> Apply to products indicating: Hair Loss.

### Sexual Wellness
- **`condition:sexual-health`** -> Apply to products indicating: Low Libido, Sexual Dysfunction, Hormonal Imbalance, Sexual Performance Anxiety.

### Immunity & General Wellness
- **`condition:immunity`** -> Apply to products indicating: Immunity, Immune Support, Immune Deficiency.
- **`condition:energy`** -> Apply to products indicating: Fatigue, Energy Deficiency, Athletic Performance.
- **`condition:inflammation`** -> Apply to products indicating: Chronic Inflammation, Localised Inflammation, Autoimmune Conditions.

### Cognitive Health
- **`condition:focus`** -> Apply to products indicating: Cognitive Decline, Memory Issues, ADHD, Brain Health, Neuroprotection.

### Specialty Care
- **`condition:addiction-recovery`** -> Apply to products indicating: Alcohol De-Addiction, Tobacco Withdrawal, Addiction Recovery, Nicotine Cessation.
- **`condition:cancer-care`** -> Apply to products indicating: Cancer Pain, Late-stage Cancer.

### Pets
- **`condition:pet-anxiety`** -> Apply to products indicating: Pet Anxiety.
- **`condition:pet-joint-pain`** -> Apply to products indicating: Pet Joint Pain.
- **`condition:pet-skin`** -> Apply to products indicating: Pet Skin Conditions, Hot Spots.

---

**Implementation Note:**
A single product can have multiple `condition:*` tags. For example, a full-spectrum tincture might have `condition:anxiety`, `condition:sleep`, and `condition:chronic-pain`.
