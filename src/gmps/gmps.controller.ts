import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Gmp } from './gmp.entity';
import { GmpsProvider } from './gmps.service';

@Controller('gmps')
export class GmpsController {
  constructor(private gmpsProvider: GmpsProvider) {}

  @Get()
  getGmps() {
    return this.gmpsProvider.getGmps();
  }

  @Get('/with/proffessors')
  getGmpsWithProffessors() {
    return this.gmpsProvider.getGmpsWithProffessors();
  }

  @Get('/with/proffessors/all')
  getGmpsWithProffessorsAndRelations() {
    return this.gmpsProvider.getGmpsWithProffessorsAndRelations();
  }

  @Get('/without/proffessors')
  getGmpsWithoutProffessors() {
    return this.gmpsProvider.getGmpsWithoutProffessors();
  }

  @Get('/without/proffessors/all')
  getGmpsWithoutProffessorsAndRelations() {
    return this.gmpsProvider.getGmpsWithoutProffessorsAndRelations();
  }

  @Get('/matter/:matterId')
  getGmpsWithMatterId(@Param('matterId') matterId: number) {
    return this.gmpsProvider.getGmpsWithMatterId(matterId);
  }

  @Get('/matter/:matterId/group/:groupId')
  getGmpsWithMatterIdAndGroupId(
    @Param('matterId') matterId: number,
    @Param('groupId') groupId: number,
  ) {
    return this.gmpsProvider.getGmpWithMatterIdAndGroupId(matterId, groupId);
  }

  @Get('/matter/:matterId/proffessor/:proffessorId')
  getGmpsWithMatterIdAndProfessorId(
    @Param('matterId') matterId: number,
    @Param('proffessorId') proffessorId: number,
  ) {
    return this.gmpsProvider.getGmpsWithMatterIdAndProffessorId(
      matterId,
      proffessorId,
    );
  }

  @Get('/matter/:matterId/all')
  getGmpsWithMatterIdAndRelations(@Param('matterId') matterId: number) {
    return this.gmpsProvider.getGmpsWithMatterIdAndRelations(matterId);
  }

  @Get('/all')
  getGmpsWithRelations() {
    return this.gmpsProvider.getGmpsWithRelations();
  }

  @Get('/:id')
  getGmp(@Param('id') gmpId: number) {
    return this.gmpsProvider.getGmp(gmpId);
  }

  @Post()
  createGmp(@Body() gmpData: Omit<Gmp, 'id'>) {
    return this.gmpsProvider.createGmp(gmpData);
  }
}
