
import { Patient, Appointment, ConsultationNote, Template } from "@/types";

// Mock Patients
export const mockPatients: Patient[] = [
  {
    id: "patient-1",
    name: "Rahul Mehta",
    age: 42,
    gender: "male",
    contactNumber: "9876543210",
    email: "rahul@example.com",
    medicalHistory: "Fatty liver, Type 2 diabetes",
    allergies: ["Penicillin"],
    medications: [
      { name: "Metformin", dosage: "500mg", frequency: "twice daily" },
      { name: "Pantoprazole", dosage: "40mg", frequency: "once daily" }
    ],
    bmi: 32.4,
    weight: 98,
    height: 174,
    createdAt: new Date("2022-06-15"),
    lastVisit: new Date("2023-04-22")
  },
  {
    id: "patient-2",
    name: "Priya Sharma",
    age: 35,
    gender: "female",
    contactNumber: "8765432109",
    email: "priya@example.com",
    medicalHistory: "IBS, Anxiety",
    allergies: ["Sulfa drugs"],
    medications: [
      { name: "Mebeverine", dosage: "135mg", frequency: "three times daily" }
    ],
    bmi: 24.1,
    weight: 62,
    height: 160,
    createdAt: new Date("2022-08-03"),
    lastVisit: new Date("2023-05-10")
  },
  {
    id: "patient-3",
    name: "Arjun Patel",
    age: 56,
    gender: "male",
    contactNumber: "7654321098",
    email: "arjun@example.com",
    medicalHistory: "GERD, Hypertension",
    allergies: [],
    medications: [
      { name: "Amlodipine", dosage: "5mg", frequency: "once daily" },
      { name: "Esomeprazole", dosage: "40mg", frequency: "once daily" }
    ],
    bmi: 29.8,
    weight: 86,
    height: 170,
    createdAt: new Date("2022-03-28"),
    lastVisit: new Date("2023-05-15")
  },
  {
    id: "patient-4",
    name: "Sunita Kapoor",
    age: 48,
    gender: "female",
    contactNumber: "6543210987",
    email: "sunita@example.com",
    medicalHistory: "Obesity, Sleep Apnea",
    allergies: ["Aspirin"],
    medications: [
      { name: "CPAP therapy", dosage: "N/A", frequency: "nightly" }
    ],
    bmi: 38.2,
    weight: 104,
    height: 165,
    createdAt: new Date("2022-11-12"),
    lastVisit: new Date("2023-05-18")
  },
  {
    id: "patient-5",
    name: "Nitin Gupta",
    age: 29,
    gender: "male",
    contactNumber: "5432109876",
    email: "nitin@example.com",
    medicalHistory: "Crohn's disease",
    allergies: [],
    medications: [
      { name: "Mesalamine", dosage: "1g", frequency: "twice daily" },
      { name: "Azathioprine", dosage: "50mg", frequency: "once daily" }
    ],
    bmi: 21.3,
    weight: 65,
    height: 175,
    createdAt: new Date("2023-01-05"),
    lastVisit: new Date("2023-05-02")
  }
];

// Mock Appointments for Today
export const mockAppointments: Appointment[] = [
  {
    id: "appt-1",
    patientId: "patient-1",
    patientName: "Rahul Mehta",
    date: new Date(new Date().setHours(9, 30, 0, 0)),
    status: "scheduled",
    reason: "Follow-up on fatty liver treatment"
  },
  {
    id: "appt-2",
    patientId: "patient-2",
    patientName: "Priya Sharma",
    date: new Date(new Date().setHours(10, 15, 0, 0)),
    status: "scheduled",
    reason: "IBS symptoms worsening"
  },
  {
    id: "appt-3",
    patientId: "patient-3",
    patientName: "Arjun Patel",
    date: new Date(new Date().setHours(11, 0, 0, 0)),
    status: "scheduled",
    reason: "Annual checkup"
  },
  {
    id: "appt-4",
    patientId: "patient-4",
    patientName: "Sunita Kapoor",
    date: new Date(new Date().setHours(13, 45, 0, 0)),
    status: "scheduled",
    reason: "Weight management consultation"
  },
  {
    id: "appt-5",
    patientId: "patient-5",
    patientName: "Nitin Gupta",
    date: new Date(new Date().setHours(14, 30, 0, 0)),
    status: "scheduled",
    reason: "Crohn's flare-up"
  }
];

// Mock Templates
export const mockTemplates: Template[] = [
  {
    id: "template-1",
    name: "GERD Initial Consult",
    category: "GI",
    content: {
      chiefComplaint: "Patient presents with symptoms of heartburn, regurgitation, and chest pain.",
      history: "Onset: [Duration]\nFrequency: [Frequency]\nAssociated symptoms: [Associated symptoms]\nAggravating factors: [Aggravating factors]\nRelieving factors: [Relieving factors]",
      examination: "Vitals: Within normal limits\nAbdomen: Soft, non-tender, no organomegaly",
      diagnosis: ["GERD"],
      plan: "1. Lifestyle modifications: avoid late meals, reduce spicy/fatty foods, elevate head of bed\n2. PPI therapy for 4-8 weeks\n3. Follow-up in 1 month",
      followUp: "4 weeks"
    },
    createdBy: "user-1",
    isFavorite: true
  },
  {
    id: "template-2",
    name: "Obesity Management Plan",
    category: "obesity",
    content: {
      chiefComplaint: "Patient presents for obesity management.",
      history: "Weight history: [Weight history]\nPrevious weight loss attempts: [Previous attempts]\nDiet history: [Diet history]\nExercise routine: [Exercise routine]",
      examination: "Weight: [Weight] kg\nHeight: [Height] cm\nBMI: [BMI]\nWaist circumference: [Waist] cm",
      diagnosis: ["Obesity", "Metabolic syndrome"],
      plan: "1. Diet plan: Calorie deficit of 500-750 kcal/day\n2. Physical activity: 150 min/week moderate-intensity\n3. Behavioral therapy\n4. Consider pharmacotherapy if BMI >30 or >27 with comorbidities\n5. Monitor weight, metabolic parameters",
      followUp: "2 weeks"
    },
    createdBy: "user-1",
    isFavorite: true
  },
  {
    id: "template-3",
    name: "IBS Assessment",
    category: "GI",
    content: {
      chiefComplaint: "Patient presents with abdominal pain, altered bowel habits.",
      history: "Onset: [Duration]\nPattern: [Diarrhea/Constipation/Mixed]\nPain characteristics: [Pain description]\nTrigger foods: [Trigger foods]",
      examination: "Abdomen: Soft, mild tenderness in [location], no organomegaly",
      diagnosis: ["Irritable Bowel Syndrome"],
      plan: "1. Dietary modifications: Low FODMAP diet trial\n2. Stress management\n3. Consider antispasmodics for pain\n4. Consider psyllium fiber for constipation\n5. Consider loperamide for diarrhea",
      followUp: "4 weeks"
    },
    createdBy: "user-1",
    isFavorite: false
  },
  {
    id: "template-4",
    name: "Colonoscopy Report",
    category: "procedure",
    content: {
      chiefComplaint: "Patient presents for screening colonoscopy.",
      history: "Indication: [Indication]\nPrevious screening: [Previous screening]",
      examination: "Procedure: Colonoscopy\nInsertion to cecum: [Time]\nWithdrawal time: [Time]\nFindings: [Findings]\nInterventions: [Interventions]\nComplications: None",
      diagnosis: ["Normal colonoscopy"],
      plan: "1. Repeat colonoscopy in [Time interval]\n2. Follow-up for pathology results if biopsies taken",
      followUp: "As needed for results"
    },
    createdBy: "user-1",
    isFavorite: false
  }
];

// Mock Consultation Notes
export const mockNotes: ConsultationNote[] = [
  {
    id: "note-1",
    patientId: "patient-1",
    doctorId: "user-1",
    date: new Date("2023-05-15"),
    content: {
      chiefComplaint: "Follow-up for fatty liver disease and diabetes management",
      history: "Patient reports improved energy levels since starting on Metformin. Still experiences occasional right upper quadrant discomfort after heavy meals. Has been following low-carb diet with moderate compliance.",
      examination: "Weight: 98kg (unchanged)\nBP: 132/82\nAbdomen: Soft, mild tenderness in RUQ, no hepatomegaly on palpation",
      diagnosis: ["Non-alcoholic fatty liver disease", "Type 2 diabetes mellitus"],
      plan: "1. Continue Metformin 500mg BID\n2. Increase physical activity to 30 min/day\n3. Stricter adherence to low-carb diet\n4. Repeat liver function tests in 3 months\n5. Referral to dietitian",
      medications: [
        { name: "Metformin", dosage: "500mg", frequency: "twice daily" },
        { name: "Pantoprazole", dosage: "40mg", frequency: "once daily" }
      ],
      followUp: "3 months"
    },
    tags: ["diabetes", "fatty liver"],
    status: "completed"
  },
  {
    id: "note-2",
    patientId: "patient-2",
    doctorId: "user-1",
    date: new Date("2023-05-10"),
    content: {
      chiefComplaint: "Worsening IBS symptoms with increased stress",
      history: "Patient reports increased abdominal pain and altered bowel movements over past 3 weeks. Associates with work-related stress. Pain is crampy, relieved with defecation. No blood in stool, no weight loss.",
      examination: "Abdomen: Soft, diffuse tenderness in LLQ, no masses, normal bowel sounds",
      diagnosis: ["Irritable Bowel Syndrome - diarrhea predominant"],
      plan: "1. Increase Mebeverine to TID\n2. Start probiotic supplement\n3. Low FODMAP diet education provided\n4. Stress management techniques discussed",
      medications: [
        { name: "Mebeverine", dosage: "135mg", frequency: "three times daily" },
        { name: "Probiotic", dosage: "1 capsule", frequency: "daily" }
      ],
      followUp: "4 weeks"
    },
    tags: ["IBS", "stress"],
    status: "completed"
  }
];
