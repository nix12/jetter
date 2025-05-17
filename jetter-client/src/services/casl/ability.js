import { Ability, AbilityBuilder } from '@casl/ability';

const subjectName = subject => {
  if (!subject || typeof subject === 'string') {
    return subject;
  }

  return subject.__type;
};

export const ability = new Ability([], { subjectName });

export const defineRulesFor = user => {
  const { rules, can } = AbilityBuilder.extract();

  user.rules.map(rule => {
    can(rule.actions, rule.subject, rule.conditions);
  });

  return ability.update(rules);
};
