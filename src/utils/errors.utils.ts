import { HttpException, HttpStatus } from '@nestjs/common';
// User Errors
export function userFoundError() {
  throw new HttpException('User found', HttpStatus.FOUND);
}
export function userNotFoundError() {
  throw new HttpException('User not found', HttpStatus.NOT_FOUND);
}
export function invalidPasswordError() {
  throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
}
// Turn Errors
export function turnFoundError() {
  throw new HttpException('Turn found', HttpStatus.FOUND);
}
export function turnNotFoundError() {
  throw new HttpException('Turn not found', HttpStatus.NOT_FOUND);
}
// Specialty Errors
export function specialtyFoundError() {
  throw new HttpException('Specialty found', HttpStatus.FOUND);
}
export function specialtyNotFoundError() {
  throw new HttpException('Specialty not found', HttpStatus.NOT_FOUND);
}
// Proffessor Errors
export function proffessorFoundError() {
  throw new HttpException('Proffessor found', HttpStatus.FOUND);
}
export function proffessorNotFoundError() {
  throw new HttpException('Proffessor not found', HttpStatus.NOT_FOUND);
}
// Matter Errors
export function matterFoundError() {
  throw new HttpException('Matter found', HttpStatus.FOUND);
}
export function matterNotFoundError() {
  throw new HttpException('Matter not found', HttpStatus.NOT_FOUND);
}
// Profile Errors
export function profileFoundError() {
  throw new HttpException('Profile found', HttpStatus.FOUND);
}
export function profileNotFoundError() {
  throw new HttpException('Profile not found', HttpStatus.NOT_FOUND);
}
// Person Errors
export function personFoundError() {
  throw new HttpException('Person found', HttpStatus.FOUND);
}
export function personNotFoundError() {
  throw new HttpException('Person not found', HttpStatus.NOT_FOUND);
}
// Group Errors
export function groupFoundError() {
  throw new HttpException('Group found', HttpStatus.FOUND);
}
export function groupNotFoundError() {
  throw new HttpException('Group not found', HttpStatus.NOT_FOUND);
}
// MG Errors
export function mgFoundError() {
  throw new HttpException('MG found', HttpStatus.FOUND);
}
export function mgNotFoundError() {
  throw new HttpException('MG not found', HttpStatus.NOT_FOUND);
}
// GMP Errors
export function gmpFoundError() {
  throw new HttpException('GMP found', HttpStatus.FOUND);
}
export function gmpNotFoundError() {
  throw new HttpException('GMP not found', HttpStatus.NOT_FOUND);
}
// Absence Errors
export function absenceFoundError() {
  throw new HttpException('Absence found', HttpStatus.FOUND);
}
export function absenceNotFoundError() {
  throw new HttpException('Absence not found', HttpStatus.NOT_FOUND);
}
export function startDateError() {
  throw new HttpException(
    'StartDate cannot be greater than EndDate',
    HttpStatus.BAD_REQUEST,
  );
}
export function invalidDatesError() {
  throw new HttpException('Invalid dates', HttpStatus.BAD_REQUEST);
}
