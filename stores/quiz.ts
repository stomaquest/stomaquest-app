import { defineStore } from 'pinia';
import axios from 'axios';
import type { Quiz, Step } from '~/types';

export const useQuizStore = defineStore('quiz', {
  state: () => ({
    quiz: {} as Quiz,
    currentStep: -1,
    currentStepData: {} as Step,
    API_URL: process.env.API_URL,
  }),
  actions: {
    async fetchQuiz() {
      const response = await axios.get(`${this.API_URL}/quiz`);
      this.quiz = response.data;
    },
    async updateQuiz() {
      await axios.patch(`${this.API_URL}/quiz`, this.quiz);
    },
    nextStep() {
      this.currentStep++;
      if (!this.isLastStep) {
        this.currentStepData = this.quiz.steps[this.currentStep];
      }
    },
    setStep(step: number) {
      this.currentStep = step;
      this.currentStepData = this.quiz.steps[step];
    },
    removeQuestion(step: number, question: number) {
      this.quiz.steps[step].questions.splice(question, 1);
    },
    addQuestion(step: number) {
      this.quiz.steps[step].questions.push({
        question: '',
        answer: '',
      });
    },
    addStep() {
      this.quiz.steps.push({
        title: '',
        type: 'quiz',
        questions: [],
      });
      this.addQuestion(this.quiz.steps.length - 1);
    },
    removeStep(step: number) {
      this.quiz.steps.splice(step, 1);
    },
  },
  getters: {
    stepType(state): string {
      return state.currentStepData?.type;
    },
    isLastStep(state): boolean {
      return state.currentStep >= state.quiz.steps.length;
    },
    completedCurrentStep(state): boolean {
      return !!state.currentStepData.completed;
    },
    stepTitle(state): string {
      return state.currentStepData.title;
    },
    stepSubtitle(state): string {
      return state.currentStepData.subtitle || '';
    },
    steps(state): Step[] {
      return state.quiz.steps;
    },
  },
  persist: true,
});
