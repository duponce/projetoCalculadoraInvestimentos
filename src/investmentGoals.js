function convertToMonthlyReturnRate(yearlyReturnRate) {
  return yearlyReturnRate ** (1 / 12);
}

export function generateReturnsArray(
  startingAmount = 0,
  timeHorizon = 0,
  monthlyContribuiton = 0,
  returnRate = 0,
  timePeriod = "monthly",
  returnTimeFrame = "monthly"
) {
  if (!timeHorizon || !startingAmount) {
    throw new Error(
      "Precisamos que passe os valores de Investimento Inicial e Prazo."
    );
  }

  const finalReturnRate =
    returnTimeFrame === "monthly"
      ? 1 + returnRate / 100
      : convertToMonthlyReturnRate(1 + returnRate / 100);

  const finalTimeHorizon =
    timePeriod === "monthly" ? timeHorizon : timeHorizon * 12;

  const referenceInvestmentObject = {
    InvestedAmount: startingAmount,
    InterestReturns: 0,
    totalInterestReturns: 0,
    month: 0,
    totalAmount: startingAmount,
  };

  const returnsArray = [referenceInvestmentObject];
  for (
    let timeReference = 1;
    timeReference <= finalTimeHorizon;
    timeReference++
  ) {
    const totalAmount =
      returnsArray[timeReference - 1].totalAmount * finalReturnRate +
      monthlyContribuiton;
    const interestReturns =
      returnsArray[timeReference - 1].totalAmount * finalReturnRate;
    const investedAmount = startingAmount + monthlyContribuiton * timeReference;
    const totalInterestReturns = totalAmount - investedAmount;
    returnsArray.push({
      investedAmount,
      interestReturns,
      totalInterestReturns,
      month: timeReference,
      totalAmount,
    });
  }

  return returnsArray;
}
