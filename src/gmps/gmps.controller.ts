import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Gmp } from './gmp.entity';
import { GmpsProvider } from './gmps.service';

@Controller('gmps')
export class GmpsController {
  constructor(private gmpsProvider: GmpsProvider) {}

  @Get()
  getGmps() {
    return this.gmpsProvider.getGmps();
  }

  @Get('/group/:groupId')
  getGmpsWithGroupId(@Param('groupId') groupId: number) {
    return this.gmpsProvider.getGmpsWithGroupId(groupId);
  }

  @Get('/group/:groupId/all')
  getGmpsWithGroupIdAndRelations(@Param('groupId') groupId: number) {
    return this.gmpsProvider.getGmpsWithGroupIdAndRelations(groupId);
  }

  @Get('/proffessor/:proffessorId')
  getGmpsWithProffessorId(@Param('proffessorId') proffessorId: number) {
    return this.gmpsProvider.getGmpsWithProffessorId(proffessorId);
  }

  @Get('/proffessor/:proffessorId/all')
  getGmpsWithProffessorIdAndRelations(
    @Param('proffessorId') proffessorId: number,
  ) {
    return this.gmpsProvider.getGmpsWithProffessorIdAndRelations(proffessorId);
  }

  @Get('/group/:groupId/proffessor/:proffessorId')
  getGmpsWithGroupIdAndProffessorId(
    @Param('groupId') groupId: number,
    @Param('proffessorId') proffessorId: number,
  ) {
    return this.gmpsProvider.getGmpsWithGroupIdAndProffessorId(
      groupId,
      proffessorId,
    );
  }

  @Get('/group/:groupId/proffessor/:proffessorId/all')
  getGmpsWithGroupIdProffessorIdAndRelations(
    @Param('groupId') groupId: number,
    @Param('proffessorId') proffessorId: number,
  ) {
    return this.gmpsProvider.getGmpsWithGroupIdProffessorIdAndRelations(
      groupId,
      proffessorId,
    );
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

  @Get('/matter/:matterId/group/:groupId/all')
  getGmpsWithMatterIdGroupIdAndRelations(
    @Param('matterId') matterId: number,
    @Param('groupId') groupId: number,
  ) {
    return this.gmpsProvider.getGmpWithMatterIdGroupIdAndRelations(
      matterId,
      groupId,
    );
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

  @Get('/matter/:matterId/proffessor/:proffessorId/all')
  getGmpsWithMatterIdProfessorIdAndRelations(
    @Param('matterId') matterId: number,
    @Param('proffessorId') proffessorId: number,
  ) {
    return this.gmpsProvider.getGmpsWithMatterIdProffessorIdAndRelations(
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

  @Get('/:id/all')
  getGmpWithRelations(@Param('id') gmpId: number) {
    return this.gmpsProvider.getGmpWithRelations(gmpId);
  }

  @Post()
  createGmp(@Body() gmpData: Omit<Gmp, 'id'>) {
    return this.gmpsProvider.createGmp(gmpData);
  }

  @Put('/:gmpId')
  updateGmp(
    @Param('gmpId') gmpId: number,
    @Body() gmpData: Omit<Gmp, 'id' | 'matter' | 'group' | 'proffessor'>,
  ) {
    return this.gmpsProvider.updateGmp(gmpId, gmpData);
  }

  @Delete('/:gmpId')
  deleteGmp(@Param('gmpId') gmpId: number) {
    return this.gmpsProvider.deleteGmp(gmpId);
  }
}
