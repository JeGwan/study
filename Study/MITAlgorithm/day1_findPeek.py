import time
def straight_forward(li):
  length = len(li)
  for i in range(length):
    if(i == 0 and li[i] >= li[i+1]):
      break
    elif(i == length-1 and li[i] >= li[i-1]):
      break
    else:
      if(li[i] >= li[i-1] and li[i] >= li[i+1]):
        break
  return i
start = time.time()
print(straight_forward(list(range(1000000))))