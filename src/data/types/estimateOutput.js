import {
  GraphQLList as ListType,
  GraphQLFloat as FloatType,
  GraphQLBoolean as BoolType,
  GraphQLString as StringType,
  GraphQLObjectType as ObjectType,
} from 'graphql';

const TaskOutputType = new ObjectType({
  name: 'TaskOutputType',
  fields: () => ({
    taskName: {
      type: StringType,
    },
    minimumMinutes: {
      type: FloatType,
    },
    maximumMinutes: {
      type: FloatType,
    },
    parent: {
      type: StringType,
    },
    isChecked: {
      type: BoolType,
    },
    tasks: {
      type: new ListType(TaskOutputType),
    },
  }),
});

const EstimateOptionsOutputType = new ObjectType({
  name: 'EstimateOptionsOutputType',
  fields: {
    qa: {
      type: FloatType,
    },
    pm: {
      type: FloatType,
    },
    risks: {
      type: FloatType,
    },
    bugFixes: {
      type: FloatType,
    },
    probability: {
      type: FloatType,
    },
  },
});

const ContributorsOutputType = new ObjectType({
  name: 'ContributorsOutputType',
  fields: () => ({
    _id: {
      type: StringType,
    },
    name: {
      type: StringType,
    },
    email: {
      type: StringType,
    },
    status: {
      type: StringType,
    },
  }),
});

const OwnerOutputType = new ObjectType({
  name: 'OwnerOutputType',
  fields: () => ({
    _id: {
      type: StringType,
    },
    name: {
      type: StringType,
    },
    email: {
      type: StringType,
    },
    status: {
      type: StringType,
    },
  }),
});

const EstimateOutputType = new ObjectType({
  name: 'EstimateOutputType',
  fields: () => ({
    contributors: {
      type: new ListType(ContributorsOutputType),
    },
    _id: {
      type: StringType,
    },
    owner: {
      type: OwnerOutputType,
    },
    date: {
      type: StringType,
    },
    clientName: {
      type: StringType,
    },
    projectName: {
      type: StringType,
    },
    data: {
      type: StringType,
    },
    sprintNumber: {
      type: StringType,
    },
    comments: {
      type: StringType,
    },
    technologies: {
      type: new ListType(StringType),
    },
    solutionScope: {
      type: new ListType(StringType),
    },
    pm: {
      type: StringType,
    },
    skype: {
      type: StringType,
    },
    email: {
      type: StringType,
    },
    position: {
      type: StringType,
    },
    moneyRate: {
      type: StringType,
    },
    estimateOptions: {
      type: EstimateOptionsOutputType,
    },
    tasks: {
      type: new ListType(TaskOutputType),
    },
    estimates: {
      type: new ListType(EstimateOutputType),
    },
    userCanEditThisEstimate: {
      type: BoolType,
    },
  }),
});


export default EstimateOutputType;
