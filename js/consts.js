const body = document.querySelector("body");
const finishingBox = document.querySelector(".finishing-box");
const mainBox = document.querySelector(".main-box");
const reload = document.querySelector("#reload");
const user = document.querySelector("#user");

const keys = document.querySelector(".keys");
const present = document.querySelector(".present");
const correctWords = document.querySelector(".correct-word");
const wrongWords = document.querySelector(".wrong-word");
const speed = document.querySelector(".speed");
const useTime = document.querySelector(".useTime");
const userScores = document.querySelector("#userScores");
const wordLimits = document.querySelector(".links");
const userInfo = document.querySelector(".user-info");
const bgHind = document.querySelector(".bgHind")
const audio = document.querySelector("#audio")
const input = document.querySelector(".input-box input");
const timeBox = document.querySelector(".time");
const refresh = document.querySelector("#refresh");
const userScore = document.querySelector("#userScore");
const more = document.querySelector("#more");
const alertResult = document.querySelector("#alertResult")

const startingBox = document.querySelector(".starting-box");
const play = document.querySelector("#play")
const modal = document.querySelector(".modal");
const textElement = document.querySelector("#text");
let lastWord = "hello";
let interVal;
let resultArr;
let wpm;

